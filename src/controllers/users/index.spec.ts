import UserService, { IUserService } from '../../services/users';
import UserController from '.';

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UsersController', () => {
  it('should find a user', async () => {
    const usersService: IUserService = new UserService();
    const usersController = new UserController(usersService);
    const user = {
      username: 'ok',
    };
    const req: any = {
      user,
    };
    const res = mockResponse();
    await usersController.me(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      username: user.username,
    });
  });
});
