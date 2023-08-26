import { Router } from 'express';
import {
    userSignUpController,
    userSignInController,
} from '../controllers/auth.controller';
const authRouter = Router();

authRouter.post('/register', userSignUpController);

authRouter.get('/login', (req, res) => {});

export default authRouter
