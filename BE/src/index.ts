import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDB } from './db';

import registerRoute    from './routes/register';
import chatRoute        from './routes/chat';
import adminLoginRoute  from './routes/admin/login';
import usersRoute       from './routes/admin/users';
import exportRoute      from './routes/admin/export';

async function start() {
  await initDB();
  console.log('Database đã sẵn sàng');

  const app  = express();
  const PORT = parseInt(process.env.PORT || '3001', 10);

  app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
  app.use(express.json());

  app.use('/api/register',     registerRoute);
  app.use('/api/chat',         chatRoute);
  app.use('/api/admin/login',  adminLoginRoute);
  app.use('/api/admin/users',  usersRoute);
  app.use('/api/admin/export', exportRoute);

  app.get('/health', (_, res) => res.json({ status: 'ok' }));

  app.listen(PORT, () => {
    console.log(`BE server chạy tại http://localhost:${PORT}`);
  });
}

start().catch(err => { console.error('Khởi động thất bại:', err); process.exit(1); });
