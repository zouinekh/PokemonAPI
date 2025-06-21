import { Request, Response } from 'express';
import { fetchPokemonById, fetchPokemons, updatePokemonById } from '../services/pokemon.service';
import { PokemonQueryParams, PokemonUpdateInput } from '../models/pokemon.model';

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const params: PokemonQueryParams = {
      type: req.query.type as string | undefined,
      sortBy: req.query.sort_by as 'name' | 'power',
      order: req.query.order as 'asc' | 'desc',
      search: req.query.search as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const data = await fetchPokemons(params);
    res.json(data);
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export  const updatePokemon = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const body: PokemonUpdateInput = req.body;
        console.log(id)
      if (body.power && (body.power < 10 || body.power > 100)) {
      res.status(400).json({ error: 'Power must be between 10 and 100' });
      }
  
      if (body.life && (body.life < 10 || body.life > 100)) {
       res.status(400).json({ error: 'Life must be between 10 and 100' });
      }
  
      const updated = await updatePokemonById(id, body);
      if (!updated)  res.status(404).json({ error: 'Pokémon not found' });
  
      res.json({ message: 'Pokémon updated successfully', data: updated });
    } catch (error) {
      console.error('Error updating Pokémon:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const getPokemonById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pokemon = await fetchPokemonById(id);
      if (!pokemon) {
        res.status(404).json({ error: 'Pokémon not found' });
      } else {
        res.json(pokemon);
      }
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }