import { Router } from 'express';
import usersController from '../controllers/users';

const router = Router();

router.post('/signup', usersController.signUp);
router.post('/signin', usersController.signIn);
router.get('/:userId/characters', usersController.fetchUserCharacters)

export default router;
