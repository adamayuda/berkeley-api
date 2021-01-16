import AuthController from '../controllers/auth';
import { AuthLoginDto } from '../dto/auth';
import AuthService from '../services/auth';
import { Router } from 'express';
import { validateDto } from '../middlewares/validateDto';

const authService = new AuthService();
const authController = new AuthController(authService);

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/login', validateDto(AuthLoginDto), authController.login);
};
