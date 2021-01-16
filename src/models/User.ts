import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username?: string;
  picture?: string;
  refreshToken?: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  picture: {
    type: String,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
