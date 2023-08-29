import { Router } from 'express';
import validator from '../middlewares/validators';
import { userProfileController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/profile', validator.Username, userProfileController);

export default userRouter;
