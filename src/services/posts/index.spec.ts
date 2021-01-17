import Post, { IPost } from '../../models/Post';
import PostService, { IPostService } from '.';

describe('PostService', () => {
  describe('generateConfig', () => {
    let postService: IPostService;
    const post = {
      user: { username: 'username', picture: 'picture' },
      description: 'description',
      photo: 'photo',
    };

    beforeEach(() => {
      postService = new PostService();
    });

    it('should be defined', () => {
      expect(postService).toBeDefined();
    });

    it('should get all the post of a user', async () => {
      const posts = [post];
      Post.find = jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockResolvedValueOnce(posts),
      }));

      await expect(postService.getAll({ userId: 'userId' })).resolves.toEqual(
        posts,
      );
    });

    it('should throw an error on get all the posts of user', async () => {
      Post.find = jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockRejectedValueOnce('error'),
      }));

      await expect(postService.getAll({ userId: 'userId' })).rejects.toBe(
        'error',
      );
    });

    it('should get one post of a user by id', async () => {
      Post.findOne = jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockResolvedValueOnce(post),
      }));

      await expect(postService.getOne({ id: 'id' })).resolves.toEqual(post);
    });

    it('should throw an error on get one post of a user by id', async () => {
      Post.findOne = jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockRejectedValueOnce('error'),
      }));

      await expect(postService.getOne({ id: 'id' })).rejects.toBe('error');
    });

    it('should create a post', async () => {
      Post.create = jest.fn().mockResolvedValueOnce(post);

      await expect(
        postService.createOne({
          user: 'userId',
          description: post.description,
          photo: post.photo,
        }),
      ).resolves.toEqual(post);
    });

    it('should throw an error on create one a post', async () => {
      Post.create = jest.fn().mockRejectedValueOnce('error');

      await expect(
        postService.createOne({
          user: 'userId',
          description: post.description,
          photo: post.photo,
        }),
      ).rejects.toBe('error');
    });

    it('should update a post', async () => {
      const post = {
        user: { username: 'username', picture: 'picture' },
        description: 'description',
        photo: 'photo',
      };

      Post.updateOne = jest.fn().mockResolvedValueOnce(post);

      await expect(
        postService.patchOne('id', {
          description: post.description,
        }),
      ).resolves.toBe(undefined);
    });

    it('should throw an error on update a post', async () => {
      Post.updateOne = jest.fn().mockRejectedValueOnce('error');

      await expect(
        postService.patchOne('id', {
          description: post.description,
        }),
      ).rejects.toBe('error');
    });

    it('should delete a post', async () => {
      Post.deleteOne = jest.fn().mockResolvedValueOnce({ id: 'id' });

      await expect(postService.deleteOne('id')).resolves.toBe(undefined);
    });

    it('should throw an error on delete a post', async () => {
      Post.deleteOne = jest.fn().mockRejectedValueOnce('error');

      await expect(postService.deleteOne('id')).rejects.toBe('error');
    });
  });
});
