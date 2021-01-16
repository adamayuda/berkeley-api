import { Router } from 'express';

import { isAuth } from '../middlewares/isAuth';
import UserController from '../controllers/users';
import UserService from '../services/users';

const route = Router();

const userService = new UserService();
const userController = new UserController(userService);

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', isAuth('_id username'), userController.me);
};
