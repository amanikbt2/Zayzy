import mongoose, { Schema, Document } from 'mongoose';

export interface IGameProgress extends Document {
  userId: string;
  gameId: string;
  currentLevel: number;
  completedLevels: number[];
  highScore: number;
  stars: Record<string, number>; // level index/number to stars count
  lastPlayed: Date;
  updatedAt: Date;
}

const GameProgressSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    gameId: { type: String, required: true, index: true },
    currentLevel: { type: Number, default: 1 },
    completedLevels: { type: [Number], default: [] },
    highScore: { type: Number, default: 0 },
    stars: { type: Schema.Types.Mixed, default: {} },
    lastPlayed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

GameProgressSchema.index({ userId: 1, gameId: 1 }, { unique: true });

export default mongoose.model<IGameProgress>('GameProgress', GameProgressSchema);
