import { Router } from 'express';
import { simulateBattle } from '../controllers/battle.controller';

const router = Router();

router.post('/simulate', simulateBattle);

export default router;
