import jwt from 'jsonwebtoken';

import { config } from '../config';
import User, { IUser } from '../models/User';

export interface IAuthService {
  login({
    username,
  }: {
    username: string;
  }): Promise<{ user: IUser; token: string }>;
}

export default class AuthService implements IAuthService {
  constructor() {}

  login = async ({
    username,
  }: {
    username: string;
  }): Promise<{ user: IUser; token: string }> => {
    try {
      const user: IUser | null = await User.findOne({ username }).select(
        '_id username',
      );

      if (!user) {
        const newUser: IUser | null = await User.create({ username });

        const token: string = jwt.sign({ _id: newUser._id }, config.JWT_KEY, {
          expiresIn: '365d',
        });

        return { token, user: newUser };
      }

      const token: string = jwt.sign({ _id: user._id }, config.JWT_KEY, {
        expiresIn: '365d',
      });

      return { user, token };
    } catch (e) {
      throw e;
    }
  };
}
