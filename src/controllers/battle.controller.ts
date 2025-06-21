import { Request, Response } from 'express';
import { simulateBattleLogic } from '../services/battle.service';

export const simulateBattle = async (req: Request, res: Response) => {
  try {
    const { team1_id, team2_id } = req.body;

    if (!team1_id || !team2_id) {
       res.status(400).json({ error: 'Both team1_id and team2_id are required.' });
    }

    const result = await simulateBattleLogic(team1_id, team2_id);
    res.json(result);
  } catch (error) {
    console.error('Battle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
