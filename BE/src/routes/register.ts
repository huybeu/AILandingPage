import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

router.post('/', (req: Request, res: Response): void => {
  const { name, phone, email, title = '', company = '', learnType } = req.body ?? {};

  if (!name?.trim() || !phone?.trim() || !email?.trim()) {
    res.status(400).json({ error: 'name, phone và email là bắt buộc' });
    return;
  }
  if (!['online', 'offline'].includes(learnType)) {
    res.status(400).json({ error: 'learnType phải là "online" hoặc "offline"' });
    return;
  }

  const now = new Date();
  const registeredAt = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  const result = db.prepare(`
    INSERT INTO users (name, phone, email, title, company, learnType, payStatus, registeredAt)
    VALUES (?, ?, ?, ?, ?, ?, 'unpaid', ?)
  `).run(name.trim(), phone.trim(), email.trim(), title, company, learnType, registeredAt);

  res.status(201).json({ id: result.lastInsertRowid });
});

export default router;
