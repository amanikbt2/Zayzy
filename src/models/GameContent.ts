import mongoose, { Schema, Document } from 'mongoose';

export interface IGameContent extends Document {
  gameId: string;
  version: number;
  configuration: Record<string, any>;
  levels: Array<Record<string, any>>;
  assetsMetadata: Record<string, any>;
  audioMetadata: Record<string, any>;
  checksum: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GameContentSchema: Schema = new Schema(
  {
    gameId: { type: String, required: true, index: true },
    version: { type: Number, required: true },
    configuration: { type: Schema.Types.Mixed, default: {} },
    levels: { type: [Schema.Types.Mixed], default: [] },
    assetsMetadata: { type: Schema.Types.Mixed, default: {} },
    audioMetadata: { type: Schema.Types.Mixed, default: {} },
    checksum: { type: String, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

GameContentSchema.index({ gameId: 1, version: 1 }, { unique: true });

export default mongoose.model<IGameContent>('GameContent', GameContentSchema);
