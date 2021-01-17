import User, { IUser } from '../../models/User';

export interface IUserService {
  me({ userId }: { userId: string }): void;
}

export default class UserService implements IUserService {
  async me({ userId }: { userId: string }): Promise<IUser> {
    try {
      return await User.findOne({ user: userId });
    } catch (e) {
      throw e;
    }
  }
}
