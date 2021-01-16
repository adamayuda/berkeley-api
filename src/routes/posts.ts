import { Router } from 'express';

import { isAuth } from '../middlewares/isAuth';
import PostController from '../controllers/posts';
import PostService from '../services/posts';
import { validateDto } from '../middlewares/validateDto';
import { PostCreateOneDto, PostPatchOneDto } from '../dto/posts';

const route = Router();

const postService = new PostService();
const postController = new PostController(postService);

export default (app: Router) => {
  app.use('/posts', route);

  route.get('/', isAuth('_id'), postController.getAll);
  route.get('/:id', isAuth('_id'), postController.getOne);
  route.post(
    '/',
    isAuth('_id'),
    validateDto(PostCreateOneDto),
    postController.createOne,
  );
  route.patch(
    '/:id',
    isAuth('_id'),
    validateDto(PostPatchOneDto),
    postController.patchOne,
  );
  route.delete('/:id', isAuth('_id'), postController.deleteOne);
};
