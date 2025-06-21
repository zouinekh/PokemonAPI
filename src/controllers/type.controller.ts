import { Request, Response } from 'express';
import { fetchTypePokemons } from '../services/type.service';

export const getTypePokemons = async (req: Request, res: Response) => {
  try {
    const data = await fetchTypePokemons();
    res.json(data);
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};