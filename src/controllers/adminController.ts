import { Request, Response } from 'express';
import Game from '../models/Game';
import GameContent from '../models/GameContent';

export const adminGetGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: games.length, data: games });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const adminCreateGame = async (req: Request, res: Response) => {
  try {
    const { gameId, slug, title, description, category, engineType, downloadSize, isFeatured, isNew } = req.body;

    const existing = await Game.findOne({ gameId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Game ID already exists' });
    }

    const game = await Game.create({
      gameId,
      slug: slug || gameId,
      title,
      description,
      category: category || 'Casual',
      engineType,
      downloadSize: downloadSize || '2.0 MB',
      isFeatured: !!isFeatured,
      isNew: !!isNew,
      isPublished: true,
      version: '1.0.0',
      packageVersion: '1.0.0',
      contentVersion: 1,
    });

    return res.status(201).json({ success: true, data: game });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const adminUpdateGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const updateData = req.body;

    const updated = await Game.findOneAndUpdate({ gameId }, { $set: updateData }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const adminUpdateContent = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { version, configuration, levels, checksum } = req.body;

    const contentVersion = version || 1;

    const updatedContent = await GameContent.findOneAndUpdate(
      { gameId, version: contentVersion },
      {
        $set: {
          configuration: configuration || {},
          levels: levels || [],
          checksum: checksum || `checksum_${Date.now()}`,
          published: true,
        },
      },
      { new: true, upsert: true }
    );

    // Bump game contentVersion on the Game document
    await Game.findOneAndUpdate({ gameId }, { $set: { contentVersion } });

    return res.status(200).json({ success: true, data: updatedContent });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};
