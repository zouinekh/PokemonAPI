import supabase from '../utils/supabase';
import { BattleResult, BattleRound } from '../models/battle.model';

export const simulateBattleLogic = async (
  team1_id: string,
  team2_id: string
): Promise<BattleResult> => {
  // 1. Fetch both teams
  const { data: teams, error } = await supabase.rpc('get_teams_ordered_by_power');
  if (error || !teams) throw new Error('Failed to load teams.');

  const team1 = teams.find((t: any) => t.team_id === team1_id);
  const team2 = teams.find((t: any) => t.team_id === team2_id);

  if (!team1 || !team2) throw new Error('One or both teams not found.');

  // 2. Fetch weakness table
  const { data: weaknesses, error: weaknessError } = await supabase.from('weakness').select('*');
  if (weaknessError || !weaknesses) throw new Error('Failed to load weakness chart.');

  // Build weakness lookup: { Fire: { Water: 0.5, Grass: 2, Fire: 1 }, ... }
  const typeMap = new Map<string, Map<string, number>>();
  weaknesses.forEach((w) => {
    const attacker = w.type1;
    const defender = w.type2;
    const factor = parseFloat(w.factor);

    if (!typeMap.has(attacker)) typeMap.set(attacker, new Map());
    typeMap.get(attacker)!.set(defender, factor);
  });

  // Clone team pokémons and set initial state
  let queue1 = [...team1.pokemons];
  let queue2 = [...team2.pokemons];

  // Current Pokémon state (mutated over rounds)
  let p1 = { ...queue1.shift()! };
  let p2 = { ...queue2.shift()! };

  let rounds: BattleRound[] = [];
  let round = 1;

  while (p1 && p2) {
    const factor1 = getTypeFactor(typeMap, p1.type.name, p2.type.name);
    const factor2 = getTypeFactor(typeMap, p2.type.name, p1.type.name);

    const p1Damage = p2.power * factor2;
    const p2Damage = p1.power * factor1;

    const p1Before = p1.life;
    const p2Before = p2.life;

    p1.life -= p1Damage;
    p2.life -= p2Damage;

    rounds.push({
      round,
      team1_pokemon: {
        id: p1.id,
        name: p1.name,
        life_before: p1Before,
        life_after: Math.max(0, p1.life),
      },
      team2_pokemon: {
        id: p2.id,
        name: p2.name,
        life_before: p2Before,
        life_after: Math.max(0, p2.life),
      }
    });

    // Determine who stays
    const p1Defeated = p1.life <= 0;
    const p2Defeated = p2.life <= 0;

    if (p1Defeated) p1 = queue1.shift() || null;
    if (p2Defeated) p2 = queue2.shift() || null;

    round++;
  }

  const winner_team_id = p1 ? team1_id : team2_id;
  const { error: insertError } = await supabase.from('battles').insert({
    team1_id,
    team2_id,
    winner_id:winner_team_id,
    rounds_played: rounds.length,
    battle_log: rounds
  });
  if (insertError) {
    console.error('Failed to insert battle:', insertError.message);
    throw new Error('Failed to record battle');
  }

  return {
    winner_team_id: winner_team_id,
    rounds
  };
};

function getTypeFactor(
  typeMap: Map<string, Map<string, number>>,
  attackerType: string,
  defenderType: string
): number {
  return typeMap.get(attackerType)?.get(defenderType) ?? 1.0;
}
