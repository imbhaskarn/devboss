import { Router } from 'express';
import {
  userSignUpController,
  userSignInController,
} from '../controllers/auth.controller';
import validator from '../middlewares/validators';
import { signupSchema } from '../middlewares/validators/schema/signupSchema';
import { loginSchema } from '../middlewares/validators/schema/loginSchema';

const authRouter = Router();

authRouter.post('/register', validator(signupSchema), userSignUpController);

authRouter.post('/login', validator(loginSchema), userSignInController);

export default authRouter;
