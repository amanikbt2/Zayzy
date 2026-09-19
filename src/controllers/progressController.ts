import { Request, Response } from 'express';
import GameProgress from '../models/GameProgress';
import GameEvent from '../models/GameEvent';

export const syncProgress = async (req: Request, res: Response) => {
  try {
    const { userId, gameId, currentLevel, completedLevels, highScore, stars } = req.body;

    if (!userId || !gameId) {
      return res.status(400).json({ success: false, message: 'userId and gameId are required' });
    }

    const updated = await GameProgress.findOneAndUpdate(
      { userId, gameId },
      {
        $set: {
          currentLevel,
          completedLevels,
          highScore,
          stars,
          lastPlayed: new Date(),
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const getProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const progressList = await GameProgress.find({ userId });
    return res.status(200).json({ success: true, count: progressList.length, data: progressList });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const recordEvent = async (req: Request, res: Response) => {
  try {
    const { userId, gameId, eventType, metadata } = req.body;

    if (!userId || !gameId || !eventType) {
      return res.status(400).json({ success: false, message: 'userId, gameId, and eventType are required' });
    }

    const newEvent = await GameEvent.create({
      userId,
      gameId,
      eventType,
      metadata: metadata || {},
    });

    return res.status(201).json({ success: true, data: newEvent });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};
