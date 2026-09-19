import { Request, Response, NextFunction } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  const expectedSecret = process.env.ADMIN_SECRET || 'admin_secret_key_change_me_in_prod';

  if (!adminKey || adminKey !== expectedSecret) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid Admin Secret Key' });
  }

  next();
};
