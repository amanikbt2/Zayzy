import { Router } from 'express';
import {
  getGames,
  getGameById,
  getGameContent,
  getGameVersion,
} from '../controllers/gameController';
import {
  syncProgress,
  getProgress,
  recordEvent,
} from '../controllers/progressController';
import {
  adminGetGames,
  adminCreateGame,
  adminUpdateGame,
  adminUpdateContent,
} from '../controllers/adminController';
import {
  syncGoogleUser,
  updateUserProfile,
  getUserProfile,
} from '../controllers/userController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// Public Catalog API
router.get('/games', getGames);
router.get('/games/:gameId', getGameById);
router.get('/games/:gameId/content', getGameContent);
router.get('/games/:gameId/version', getGameVersion);

// User Profile & Google Auth API
router.post('/users/google-sync', syncGoogleUser);
router.put('/users/profile', updateUserProfile);
router.get('/users/:userId', getUserProfile);

// User Progress & Analytics Event API
router.post('/progress', syncProgress);
router.get('/progress/:userId', getProgress);
router.post('/events', recordEvent);

// Admin Management API (Protected)
router.get('/admin/games', adminAuth, adminGetGames);
router.post('/admin/games', adminAuth, adminCreateGame);
router.put('/admin/games/:gameId', adminAuth, adminUpdateGame);
router.put('/admin/games/:gameId/content', adminAuth, adminUpdateContent);

export default router;
