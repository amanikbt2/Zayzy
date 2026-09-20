import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  googleId?: string;
  username: string;
  email?: string;
  passwordHash?: string;
  avatar?: string;
  phoneNumber?: string;
  course?: string;
  campus?: string;
  bio?: string;
  isProfileComplete?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    googleId: { type: String, sparse: true, index: true },
    username: { type: String, required: true },
    email: { type: String, sparse: true },
    passwordHash: { type: String },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    phoneNumber: { type: String, default: '' },
    course: { type: String, default: '' },
    campus: { type: String, default: '' },
    bio: { type: String, default: '' },
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
