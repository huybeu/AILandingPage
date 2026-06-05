import { Router, Request, Response } from 'express';
import { signToken } from '../../auth';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body ?? {};
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'admin@2025';

  if (!username || !password || username !== validUser || password !== validPass) {
    res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });
    return;
  }

  const token = await signToken({ username, role: 'admin' });
  res.json({ token });
});

export default router;
