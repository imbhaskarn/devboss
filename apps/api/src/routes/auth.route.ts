import { Router } from 'express';
import {
  userSignUpController,
  userSignInController,
  verifyEmailController,
} from '../controllers/auth.controller';
import validator from '../middlewares/validators';
import { signupSchema } from '../middlewares/validators/schema/signupSchema';
import { loginSchema } from '../middlewares/validators/schema/loginSchema';

const authRouter = Router();

authRouter.post('/register', validator(signupSchema), userSignUpController);
authRouter.post('/login', validator(loginSchema), userSignInController);
authRouter.get('/verify', verifyEmailController);

export default authRouter;
