import { Request, Response } from 'express';
import Game from '../models/Game';
import GameContent from '../models/GameContent';

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find({ isPublished: true }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: games.length, data: games });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findOne({ gameId, isPublished: true });
    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }
    return res.status(200).json({ success: true, data: game });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const getGameContent = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { version } = req.query;

    let query: any = { gameId, published: true };
    if (version) {
      query.version = parseInt(version as string, 10);
    }

    const content = await GameContent.findOne(query).sort({ version: -1 });
    if (!content) {
      return res.status(404).json({ success: false, message: 'Game content package not found' });
    }
    return res.status(200).json({ success: true, data: content });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const getGameVersion = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findOne({ gameId }, 'gameId version packageVersion contentVersion updatedAt');
    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }
    return res.status(200).json({
      success: true,
      data: {
        gameId: game.gameId,
        version: game.version,
        packageVersion: game.packageVersion,
        contentVersion: game.contentVersion,
        updatedAt: game.updatedAt,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};
