import { Router } from 'express';
import UserController from '../controllers/users';
import UserService from '../services/users';
import { isAuth } from '../middlewares/isAuth';

const route = Router();

const userService = new UserService();
const userController = new UserController(userService);

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', isAuth('_id username'), userController.me);
};
