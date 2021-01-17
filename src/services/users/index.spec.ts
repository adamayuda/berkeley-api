import User, { IUser } from '../../models/User';
import UserService, { IUserService } from '.';

describe('UserService', () => {
  describe('generateConfig', () => {
    let userService: IUserService;
    const user = {
      user: { username: 'username', picture: 'picture' },
      description: 'description',
      photo: 'photo',
    };

    beforeEach(() => {
      userService = new UserService();
    });

    it('should be defined', () => {
      expect(userService).toBeDefined();
    });

    it('should find a user', async () => {
      User.findOne = jest.fn().mockResolvedValueOnce(user);

      await expect(userService.me({ userId: 'id' })).resolves.toBe(user);
    });

    it('should throw an error on finding a user', async () => {
      User.findOne = jest.fn().mockRejectedValueOnce('error');

      await expect(userService.me({ userId: 'id' })).rejects.toBe('error');
    });
  });
});
