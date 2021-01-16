import { Request, Response } from 'express';

import { IUser } from '../models/User';
import { IAuthService } from '../services/auth';

export interface IAuthController {
  login(req: Request, res: Response): Promise<Response>;
}

export default class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username }: { username: string } = req.body;

    try {
      const {
        user,
        token,
      }: { user: IUser | null; token: string } = await this.authService.login({
        username,
      });

      return res.status(200).json({ user, token });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  };
}
