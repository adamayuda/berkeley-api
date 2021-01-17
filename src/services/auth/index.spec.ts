import AuthService, { IAuthService } from '.';
import User from '../../models/User';

jest.mock('../../config', () => ({
  config: {
    JWT_KEY: 'ok',
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => {
    return 'token';
  }),
}));

describe('AuthService', () => {
  describe('generateConfig', () => {
    let authService: IAuthService;

    beforeEach(() => {
      authService = new AuthService();
    });

    it('should be defined', () => {
      expect(AuthService).toBeDefined();
    });

    it('should create a new user', async () => {
      User.findOne = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(null),
      }));
      User.create = jest.fn().mockResolvedValue({
        username: 'username',
      });
      await expect(
        authService.login({ username: 'username' }),
      ).resolves.toEqual({
        user: { username: 'username' },
        token: 'token',
      });
    });

    it('should find a the user', async () => {
      User.findOne = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce({ username: 'username' }),
      }));
      await expect(authService.login({ username: 'ok' })).resolves.toEqual({
        user: { username: 'username' },
        token: 'token',
      });
    });

    it('should throw an error', async () => {
      User.findOne = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockRejectedValueOnce('error'),
      }));
      await expect(authService.login({ username: 'ok' })).rejects.toEqual(
        'error',
      );
    });
  });
});
