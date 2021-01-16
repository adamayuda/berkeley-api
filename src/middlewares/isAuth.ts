import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { config } from '../config';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const isAuth = (select: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    const { authorization } = req.headers;

    try {
      const bearer: string | undefined = authorization?.split(' ')[1];

      if (!bearer) return res.status(403).json({ message: 'Forbidden' });

      const token: any = jwt.verify(bearer, config.JWT_KEY);

      const user: IUser | null = await User.findById(token._id)
        .select(select)
        .lean();

      if (!user) return res.status(401).json({ message: 'Disconnected' });

      req.user = user;

      return next();
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  };
};
