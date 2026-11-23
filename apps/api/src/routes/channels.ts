import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const channels = new Hono();

const channelSchema = z.object({
  platform: z.enum([
    'instagram', 'facebook', 'tiktok', 'linkedin', 'x', 'threads',
    'bluesky', 'pinterest', 'youtube', 'mastodon', 'substack',
  ]),
  account_name: z.string().min(1),
  access_token: z.string().min(1),
  refresh_token: z.string().optional(),
  expires_at: z.number().optional(),
});

channels.get('/', async (c) => {
  const { DB } = c.env;
  const userId = (c.get('jwtPayload') as any).sub;
  const results = await DB.prepare(
    'SELECT * FROM channels WHERE user_id = ? ORDER BY connected_at DESC'
  ).bind(userId).all();
  return c.json({ channels: results.results });
});

channels.post('/', zValidator('json', channelSchema), async (c) => {
  const { platform, account_name, access_token, refresh_token, expires_at } = c.req.valid('json');
  const { DB } = c.env;
  const userId = (c.get('jwtPayload') as any).sub;
  const id = crypto.randomUUID();

  await DB.prepare(
    `INSERT INTO channels (id, user_id, platform, account_name, access_token, refresh_token, expires_at, connected_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, userId, platform, account_name, access_token, refresh_token ?? null, expires_at ?? null, Date.now()).run();

  return c.json({ id, platform, account_name }, 201);
});

channels.delete('/:id', async (c) => {
  const { DB } = c.env;
  const userId = (c.get('jwtPayload') as any).sub;
  const id = c.req.param('id');
  await DB.prepare('DELETE FROM channels WHERE id = ? AND user_id = ?').bind(id, userId).run();
  return c.json({ success: true });
});

export { channels };
