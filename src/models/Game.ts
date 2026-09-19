import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
  gameId: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  iconUrl: string;
  engineType: 'bubble-shooter' | 'match-3' | 'puzzle' | string;
  version: string;
  packageVersion: string;
  contentVersion: number;
  isPublished: boolean;
  isFeatured: boolean;
  isNew: boolean;
  downloadSize: string;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema: Schema = new Schema(
  {
    gameId: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, default: 'Casual' },
    thumbnailUrl: { type: String, default: '' },
    iconUrl: { type: String, default: '' },
    engineType: { type: String, required: true },
    version: { type: String, required: true, default: '1.0.0' },
    packageVersion: { type: String, required: true, default: '1.0.0' },
    contentVersion: { type: Number, required: true, default: 1 },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    downloadSize: { type: String, default: '2.5 MB' },
  },
  { timestamps: true }
);

export default mongoose.model<IGame>('Game', GameSchema);
