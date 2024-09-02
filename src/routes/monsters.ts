import { Router } from 'express';
import monstersController from '../controllers/monsters';

const router = Router();

router.get('/', monstersController.index);
// router.post('/new', monstersController.create);
// router.get('/:id', monstersController.getCharacter);
// router.put('/:id', monstersController.update);
// router.delete('/:id', monstersController.destroy);

export default router;
