import supabase from '../utils/supabase';
import { Pokemon, PokemonQueryParams, PaginatedResult, PokemonUpdateInput } from '../models/pokemon.model';

export const fetchPokemons = async (
  params: PokemonQueryParams
): Promise<PaginatedResult<Pokemon>> => {
  const { type, sortBy = 'name', order = 'asc', search, page = 1, limit = 10 } = params;

  let query = supabase
    .from('pokemon')
    .select('*', { count: 'exact' });

  if (type) {
    query = query.eq('type', type);
  }

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  if (sortBy) {
    query = query.order(sortBy, { ascending: order === 'asc' });
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) throw error;

  return {
    total: count,
    page,
    pageSize: limit,
    results: data as Pokemon[],
  };
};

export const updatePokemonById = async (
    id: string,
    updates: PokemonUpdateInput
  ): Promise<Pokemon | null> => {
    const { data, error } = await supabase
      .from('pokemon')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  
    if (error) {
      console.error('Supabase update error:', error.message);
      return null;
    }
  
    return data as Pokemon;
  };