import { Router } from 'express';
import usersController from '../controllers/users';

const router = Router();

router.post('/signup', usersController.signUp);
router.post('/signin', usersController.signIn);

export default router;
