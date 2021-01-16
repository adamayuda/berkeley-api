import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IComment {
  username: string;
  content: string;
  createdAt: Date;
}

export interface IPost extends Document {
  user: IUser['_id'];
  description?: string;
  photo?: string;
  likes?: number;
  comments?: IComment[];
  createdAt?: Date;
}

const PostSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  description: String,
  photo: String,
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      username: String,
      content: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPost>('Post', PostSchema);
