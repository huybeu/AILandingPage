import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth';

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const payload = await verifyToken(auth.slice(7));
  if (!payload) {
    res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
    return;
  }
  next();
}
