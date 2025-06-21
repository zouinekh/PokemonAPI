export interface BattleRound {
    round: number;
    team1_pokemon: {
      id: string;
      name: string;
      life_before: number;
      life_after: number;
    };
    team2_pokemon: {
      id: string;
      name: string;
      life_before: number;
      life_after: number;
    };
  }
  
  export interface BattleResult {
    winner_team_id: string;
    rounds: BattleRound[];
  }
  