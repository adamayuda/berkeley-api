import { Router } from 'express';

import AuthController from '../controllers/auth';
import AuthService from '../services/auth';
import { validateDto } from '../middlewares/validateDto';
import { AuthLoginDto } from '../dto/auth';

const authService = new AuthService();
const authController = new AuthController(authService);

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/login', validateDto(AuthLoginDto), authController.login);
};
