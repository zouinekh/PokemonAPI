import { Pokemon } from '../models/pokemon.model';
import { Team } from '../models/team.model';
import supabase from '../utils/supabase';

export const createTeamRPC = async (team_name: string, pokemon_ids: string[],description:string): Promise<string | null> => {
  const { data, error } = await supabase.rpc('create_team', {
    team_name,
    pokemon_ids,
    description
  });

  if (error) {
    console.error('Supabase create_team error:', error.message);
    return null;
  }
  return data;
};

export const getAllTeamsRPC = async (): Promise<Team[]> => {
  const { data, error } = await supabase.rpc('get_teams_ordered_by_power');
  console.log(data);
  if (error) {
    console.error('Supabase RPC error:', error.message);
    throw error;
  }

  return (data || []).map((row: any) => ({
    id: row.team_id,
    name: row.team_name,
    power: parseFloat(row.total_power),
    pokemons: row.pokemons as Pokemon[]
  }));
};