import { Router } from 'express';
import auth from './auth';
import posts from './posts';
import users from './users';

export default () => {
  const app = Router();

  auth(app);
  users(app);
  posts(app);

  return app;
};
