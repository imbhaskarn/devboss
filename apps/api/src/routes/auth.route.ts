import { Router } from 'express';
import {
    userSignUpController,
    userSignInController,
} from '@/controllers/auth.controller';
import validator from '@/middlewares/validators';

import { loginSchema } from '@/middlewares/validators/schema/loginSchema';
import { verifyEmailController } from '@/controllers/auth.controller';
import { signupSchema } from '@/middlewares/validators/schema/signupSchema';

const authRouter = Router();

authRouter.post('/register', validator(signupSchema), userSignUpController);
authRouter.post('/login', validator(loginSchema), userSignInController);
authRouter.get('/verify', verifyEmailController);

export default authRouter;
