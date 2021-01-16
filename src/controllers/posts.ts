import { Request, Response } from 'express';

import { IPost } from '../models/Post';
import { IPostService } from '../services/posts';

export interface IPostController {
  getAll(req: Request, res: Response): Promise<Response>;
  getOne(req: Request, res: Response): Promise<Response>;
  createOne(req: Request, res: Response): Promise<Response>;
  patchOne(req: Request, res: Response): Promise<Response>;
  deleteOne(req: Request, res: Response): Promise<Response>;
}

export default class PostController implements IPostController {
  private postService: IPostService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const { _id: userId } = req.user;

    try {
      const posts: IPost[] = await this.postService.getAll({ userId });
      console.log(posts);
      return res.status(200).json(posts);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  };

  getOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const post: IPost = await this.postService.getOne({ id });
      return res.status(200).json(post);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  };

  createOne = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.user;
    const {
      description,
      photo,
    }: { description: string; photo: string } = req.body;

    try {
      const post: IPost = await this.postService.createOne({
        user: _id,
        description,
        photo,
      });
      return res.status(200).json(post);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  };

  patchOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { description }: { description: string } = req.body;

    try {
      await this.postService.patchOne(id, {
        description,
      });
      return res.status(200).json({});
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  };

  deleteOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      await this.postService.deleteOne(id);
      return res.status(200).json({});
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  };
}
