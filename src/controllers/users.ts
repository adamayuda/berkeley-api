import { Request, Response } from 'express';

import { IUser } from '../models/User';
import { IUserService } from '../services/users';

export interface IUserController {
  me(req: Request, res: Response): Promise<Response>;
}

export default class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  me = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(200).json(req.user);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  };
}
