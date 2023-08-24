import { Router } from 'express';
import { userSignUpController, userSignInController } from '../controllers/auth.controller';
const router = Router();

router.post('/register', userSignUpController);

router.get('/login', (req, res) => {});


export default router;
