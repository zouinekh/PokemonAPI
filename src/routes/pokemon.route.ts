import { Router } from 'express';
import { getPokemons, updatePokemon } from '../controllers/pokemon.controller';

const router = Router();

router.get('/', getPokemons);
router.patch('/:id', updatePokemon);
export default router;
