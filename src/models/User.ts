import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  username: string;
  email?: string;
  passwordHash?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    email: { type: String, sparse: true },
    passwordHash: { type: String },
    avatar: { type: String, default: 'avatar_default' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
