import { Router } from 'express';
import charactersController from '../controllers/characters';

const router = Router();

router.get('/', charactersController.index);
router.post('/new', charactersController.create);
router.put('/:id', charactersController.update);
router.delete('/:id', charactersController.destroy);

export default router;
