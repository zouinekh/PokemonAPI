import { Request, Response } from 'express';
import { CreateTeamInput } from '../models/team.model';
import { createTeamRPC, getAllTeamsRPC } from '../services/team.service';

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { team_name, pokemon_ids,description }: CreateTeamInput = req.body;

    if (!team_name || !Array.isArray(pokemon_ids) || pokemon_ids.length !== 6) {
      res.status(400).json({ error: 'team_name must be provided and exactly 6 Pokémon IDs required' });
    }

    const result = await createTeamRPC(team_name, pokemon_ids ,description);

    if (!result) {
      res.status(500).json({ error: 'Failed to create team' });
    }

    res.status(201).json({ message: 'Team created successfully', team_id: result });
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await getAllTeamsRPC();
    res.json(teams);
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};