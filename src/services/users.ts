import User, { IUser } from '../models/User';

export interface IUserService {
  me({ uid }: { uid: string }): void;
}

export default class UserService implements IUserService {
  constructor() {}

  me({ uid }: { uid: string }): void {
    return;
  }
}
