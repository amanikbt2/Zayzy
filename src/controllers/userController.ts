import { Request, Response } from 'express';
import User from '../models/User';

// Helper to evaluate profile completion
function evaluateProfileCompletion(user: any): boolean {
  return Boolean(
    user.phoneNumber &&
    user.phoneNumber.trim().length > 3 &&
    user.course &&
    user.course.trim().length > 1 &&
    user.campus &&
    user.campus.trim().length > 1
  );
}

/**
 // Sync or Create User via Google Sign-In
 // POST /api/users/google-sync
 */
export async function syncGoogleUser(req: Request, res: Response) {
  try {
    const { userId, googleId, email, name, avatar } = req.body;

    if (!userId && !googleId) {
      return res.status(400).json({ success: false, error: 'userId or googleId is required' });
    }

    const query = googleId ? { googleId } : { userId };

    let user = await User.findOne(query);

    if (user) {
      // Update existing user details
      if (email) user.email = email;
      if (name) user.username = name;
      if (avatar) user.avatar = avatar;
      if (googleId) user.googleId = googleId;
      await user.save();
    } else {
      // Create new user in MongoDB
      user = await User.create({
        userId: userId || `usr_${Date.now()}`,
        googleId,
        username: name || 'Zayzy Player',
        email,
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        isProfileComplete: false,
      });
    }

    return res.json({
      success: true,
      message: 'Google user synced successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Error in syncGoogleUser:', error);
    return res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
}

/**
 // Update User Profile (Phone, Course, Campus, Bio)
 // PUT /api/users/profile
 */
export async function updateUserProfile(req: Request, res: Response) {
  try {
    const { userId, username, phoneNumber, course, campus, bio, avatar } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId is required' });
    }

    let user = await User.findOne({ userId });

    if (!user) {
      // Auto-create if not found
      user = new User({ userId, username: username || 'Zayzy Player' });
    }

    if (username) user.username = username;
    if (avatar) user.avatar = avatar;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (course !== undefined) user.course = course;
    if (campus !== undefined) user.campus = campus;
    if (bio !== undefined) user.bio = bio;

    user.isProfileComplete = evaluateProfileCompletion(user);

    await user.save();

    return res.json({
      success: true,
      message: 'User profile updated successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Error in updateUserProfile:', error);
    return res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
}

/**
 // Fetch User Profile from MongoDB
 // GET /api/users/:userId
 */
export async function getUserProfile(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error('Error in getUserProfile:', error);
    return res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
}
