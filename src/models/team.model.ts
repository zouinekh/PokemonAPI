import { Pokemon } from "./pokemon.model";

export interface CreateTeamInput {
    team_name: string;
    pokemon_ids: string[];
    description:string;
  }
  export interface Team {
    id: string;
    name: string;
    power: number;
    pokemons: Pokemon[];
  }