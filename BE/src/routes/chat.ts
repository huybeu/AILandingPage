import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'ANTHROPIC_API_KEY chưa được cấu hình' });
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(502).json({ error: 'Lỗi kết nối Anthropic API' });
  }
});

export default router;
