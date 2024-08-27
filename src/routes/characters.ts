import { Router } from 'express';
import charactersController from '../controllers/characters';

const router = Router();

router.get('/', charactersController.index);
router.post('/new', charactersController.create);
router.put('/:id', charactersController.update);

export default router;
