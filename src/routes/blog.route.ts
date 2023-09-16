import { Router } from 'express';
import validator from '../middlewares/validators';
import { userSignInController } from '../controllers/auth.controller';

import { createPostController } from '../controllers/blog.controller';
import { NewPostSchema } from '../middlewares/validators/schema/newPostSchema';

const blogRoute = Router();

blogRoute.post('/', validator(NewPostSchema), createPostController);
blogRoute.get('/:id', userSignInController);
blogRoute.put('/:id', userSignInController);
blogRoute.delete('/:id', userSignInController);

export default blogRoute;
