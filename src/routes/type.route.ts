import { Router } from 'express';
import { getTypePokemons } from '../controllers/type.controller';

const router = Router();

router.get('/',getTypePokemons);
export default router;
