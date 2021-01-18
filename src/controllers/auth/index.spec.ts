import AuthController, { IAuthController } from '.';
import AuthService, { IAuthService } from '../../services/auth';
import { mocked } from 'ts-jest/utils';

jest.mock('../../services/auth', () => {
  return {
    login: jest.fn().mockResolvedValue({
      user: { username: 'username', picture: 'picture' },
      token: 'description',
    }),
  };
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const req: any = {
  user: { _id: 'userId' },
  params: { id: 'postId' },
  body: {
    description: 'desc',
    photo: 'photo',
  },
};

describe('AuthsController', () => {
  const mockedAuthsService: any = mocked(AuthService, true);
  const authController = new AuthController(mockedAuthsService);

  it('should create a token', async () => {
    const res = mockResponse();

    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user: { username: 'username', picture: 'picture' },
      token: 'description',
    });
  });
});
