import { Router } from 'express';

import auth from './auth';
import users from './users';
import posts from './posts';

export default () => {
  const app = Router();

  auth(app);
  users(app);
  posts(app);

  return app;
};
