import { Router } from 'express';
import { getPokemonById, getPokemons, updatePokemon } from '../controllers/pokemon.controller';

const router = Router();

router.get('/', getPokemons);
router.patch('/:id', updatePokemon);
router.get('/:id', getPokemonById);
export default router;
