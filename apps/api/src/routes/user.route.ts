import { Router } from 'express';
import validator from '../middlewares/validators';
import { userProfileController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/profile', userProfileController);

export default userRouter;
