import { Router, Request, Response } from 'express';
import db from '../../db';
import { verifyToken } from '../../auth';

const router = Router();

// Hỗ trợ cả Bearer header và ?token= query (dùng cho download link)
async function authExport(req: Request, res: Response, next: () => void): Promise<void> {
  const fromHeader = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null;
  const token = fromHeader ?? (req.query.token as string | undefined);
  if (!token || !(await verifyToken(token))) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

router.use(authExport as Parameters<typeof router.use>[0]);

const PAY_LABEL: Record<string, string> = {
  paid: 'Đã Thanh Toán',
  pending: 'Chờ Xác Nhận',
  unpaid: 'Chưa Thanh Toán',
};

const LEARN_LABEL: Record<string, string> = {
  online: 'Online — 686.000đ',
  offline: 'Offline — 979.000đ',
};

router.get('/', (_req: Request, res: Response): void => {
  const users = db.prepare('SELECT * FROM users ORDER BY id DESC').all() as Array<Record<string, unknown>>;

  const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;

  const header = ['ID', 'Họ và Tên', 'Điện Thoại', 'Email', 'Chức Vụ', 'Doanh Nghiệp', 'Hình Thức', 'Ngày Đăng Ký', 'Thanh Toán'];
  const rows = users.map(u => [
    escape(u.id),
    escape(u.name),
    escape(u.phone),
    escape(u.email),
    escape(u.title),
    escape(u.company),
    escape(LEARN_LABEL[u.learnType as string] ?? u.learnType),
    escape(u.registeredAt),
    escape(PAY_LABEL[u.payStatus as string] ?? u.payStatus),
  ].join(','));

  const csv = [header.map(escape).join(','), ...rows].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="dang-ky.csv"');
  // BOM để Excel mở đúng UTF-8
  res.send('﻿' + csv);
});

export default router;
