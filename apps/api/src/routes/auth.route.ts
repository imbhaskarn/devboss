import { Router } from 'express';
import {
    userSignUpController,
    userSignInController,
} from '../controllers/auth.controller';
import validator from '../middlewares/validators';
const authRouter = Router();

authRouter.post('/register', validator.userSignUp, userSignUpController);

authRouter.post('/login', validator.userLogin, userSignInController);

export default authRouter;
