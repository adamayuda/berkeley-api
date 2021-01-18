import PostService, { IPostService } from '../../services/posts';
import PostController, { IPostController } from '.';
import { mocked } from 'ts-jest/utils';

const post = {
  user: { username: 'username', picture: 'picture' },
  description: 'description',
  photo: 'photo',
};

jest.mock('../../services/posts', () => {
  return {
    getAll: jest.fn().mockResolvedValue([
      {
        user: { username: 'username', picture: 'picture' },
        description: 'description',
        photo: 'photo',
      },
    ]),
    getOne: jest.fn().mockResolvedValue({
      user: { username: 'username', picture: 'picture' },
      description: 'description',
      photo: 'photo',
    }),
    createOne: jest.fn().mockResolvedValue({
      user: { username: 'username', picture: 'picture' },
      description: 'description',
      photo: 'photo',
    }),
    patchOne: jest.fn().mockResolvedValue(undefined),
    deleteOne: jest.fn().mockResolvedValue(undefined),
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

describe('PostsController', () => {
  const mockedPostsService: any = mocked(PostService, true);
  const postsController = new PostController(mockedPostsService);

  it('should find all post', async () => {
    const res = mockResponse();

    await postsController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([post]);
  });

  it('should find a post', async () => {
    const res = mockResponse();

    await postsController.getOne(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(post);
  });

  it('should create a post', async () => {
    const res = mockResponse();

    await postsController.createOne(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(post);
  });

  it('should patch a post', async () => {
    const res = mockResponse();

    await postsController.patchOne(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it('should delete a post', async () => {
    const res = mockResponse();

    await postsController.deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({});
  });
});
