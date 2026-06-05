import { Router, Request, Response } from 'express';
import db from '../../db';
import { requireAuth } from '../../middleware/requireAuth';

const router = Router();
router.use(requireAuth);

const ALLOWED_SORT_COLS = ['name', 'phone', 'email', 'title', 'company', 'learnType', 'registeredAt', 'payStatus', 'id'];

// GET /api/admin/users
router.get('/', (req: Request, res: Response): void => {
  const {
    search = '', learnType = '', payStatus = '',
    page = '1', limit = '20',
    sortCol = 'id', sortDir = 'desc',
  } = req.query as Record<string, string>;

  const pageNum  = Math.max(1, parseInt(page)  || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
  const offset   = (pageNum - 1) * limitNum;

  const cond: string[]             = [];
  const params: (string | number)[] = [];

  if (search) {
    cond.push('(name LIKE ? OR phone LIKE ? OR email LIKE ? OR company LIKE ?)');
    const s = `%${search}%`;
    params.push(s, s, s, s);
  }
  if (learnType) { cond.push('learnType = ?'); params.push(learnType); }
  if (payStatus) { cond.push('payStatus = ?'); params.push(payStatus); }

  const where   = cond.length ? `WHERE ${cond.join(' AND ')}` : '';
  const col     = ALLOWED_SORT_COLS.includes(sortCol) ? sortCol : 'id';
  const dir     = sortDir === 'asc' ? 'ASC' : 'DESC';
  const orderBy = `ORDER BY ${col} ${dir}`;

  const { cnt } = db.prepare(`SELECT COUNT(*) as cnt FROM users ${where}`).get(...params) as { cnt: number };
  const users   = db.prepare(`SELECT * FROM users ${where} ${orderBy} LIMIT ? OFFSET ?`).all(...params, limitNum, offset);

  res.json({ users, total: cnt, page: pageNum, limit: limitNum });
});

// PATCH /api/admin/users/:id — cập nhật payStatus
router.patch('/:id', (req: Request, res: Response): void => {
  const { payStatus } = req.body ?? {};
  if (!['paid', 'pending', 'unpaid'].includes(payStatus)) {
    res.status(400).json({ error: 'payStatus không hợp lệ' });
    return;
  }
  const result = db.prepare('UPDATE users SET payStatus = ? WHERE id = ?').run(payStatus, req.params.id);
  if (result.changes === 0) { res.status(404).json({ error: 'Không tìm thấy user' }); return; }
  res.json({ success: true });
});

// DELETE /api/admin/users/:id
router.delete('/:id', (req: Request, res: Response): void => {
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  if (result.changes === 0) { res.status(404).json({ error: 'Không tìm thấy user' }); return; }
  res.json({ success: true });
});

export default router;
