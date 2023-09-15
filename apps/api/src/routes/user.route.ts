import { Router } from 'express';

import { userProfileController } from '../controllers/user.controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const userRouter = Router();

userRouter.get(
  '/profile',
  isAuthenticated,
  //   validator.Username,
  userProfileController
);
userRouter.post(
  '/profile',
  isAuthenticated,
  //   validator.Username,
  userProfileController
);

export default userRouter;
