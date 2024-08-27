import { Router } from 'express';
import charactersController from '../controllers/characters';

const router = Router();

router.get('/', charactersController.index);

export default router;
