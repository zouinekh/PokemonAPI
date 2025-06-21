import { typeOfPokemon } from '../models/type.model';
import supabase from '../utils/supabase';

export const fetchTypePokemons = async (
): Promise<typeOfPokemon[]> => {
 
    const { data, error } = await supabase
    .from('pokemon_type')
    .select('*')

    if (error) throw error;

    return data as typeOfPokemon[];
}