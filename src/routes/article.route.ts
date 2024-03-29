import { Router } from 'express';
import validator from '../middlewares/validators';
import { userSignInController } from '../controllers/auth.controller';

import { NewPostSchema } from '../middlewares/validators/schema/newPostSchema';
import {
  coverStory,
  createArticleController,
} from '../controllers/article.controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const articleRouter = Router();

articleRouter.get('/cover-story', coverStory);

articleRouter.post(
  '/',
  isAuthenticated,
  validator(NewPostSchema),
  createArticleController
);
articleRouter.get('/:id', isAuthenticated);
articleRouter.put('/:id', isAuthenticated, userSignInController);
articleRouter.delete('/:id', isAuthenticated, userSignInController);

export default articleRouter;
