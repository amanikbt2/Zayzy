import mongoose, { Schema, Document } from 'mongoose';

export interface IGameEvent extends Document {
  userId: string;
  gameId: string;
  eventType: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

const GameEventSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    gameId: { type: String, required: true, index: true },
    eventType: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IGameEvent>('GameEvent', GameEventSchema);
