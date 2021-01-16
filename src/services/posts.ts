import Post, { IPost } from '../models/Post';

export interface IPostService {
  getAll({ userId }: { userId: string }): Promise<IPost[]>;
  getOne({ id }: { id: string }): Promise<IPost>;
  createOne({
    user,
    description,
    photo,
  }: {
    user: string;
    description: string;
    photo?: string;
  }): Promise<IPost>;
  patchOne(
    id: string,
    {
      description,
    }: {
      description: string;
    },
  ): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export default class PostService implements IPostService {
  async getAll({ userId }: { userId: string }): Promise<IPost[]> {
    try {
      return await Post.find({ user: userId }).populate({
        path: 'user',
        model: 'User',
        select: 'username picture',
      });
    } catch (e) {
      throw e;
    }
  }

  async getOne({ id }: { id: string }): Promise<IPost> {
    try {
      return await Post.findOne({ _id: id }).populate({
        path: 'user',
        model: 'User',
        select: 'username picture',
      });
    } catch (e) {
      throw e;
    }
  }

  async createOne({
    user,
    description,
    photo,
  }: {
    user: string;
    description: string;
    photo?: string;
  }): Promise<IPost> {
    try {
      return await Post.create({ user, description, photo });
    } catch (e) {
      throw e;
    }
  }

  async patchOne(
    id: string,
    {
      description,
    }: {
      description: string;
    },
  ): Promise<void> {
    try {
      await Post.updateOne({ _id: id }, { description });
      return;
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await Post.deleteOne({ _id: id });
      return;
    } catch (e) {
      throw e;
    }
  }
}
