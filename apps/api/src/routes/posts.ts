import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const posts = new Hono();

const postSchema = z.object({
  channel_ids: z.array(z.string()).min(1),
  content: z.string().min(1).max(2200),
  media_urls: z.array(z.string().url()).optional(),
  scheduled_at: z.number().optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'failed']).default('draft'),
  ai_generated: z.boolean().default(false),
});

posts.get('/', async (c) => {
  const { DB } = c.env;
  const userId = (c.get('jwtPayload') as any).sub;
  const results = await DB.prepare(
    'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(userId).all();
  return c.json({ posts: results.results });
});

posts.post('/', zValidator('json', postSchema), async (c) => {
  const { channel_ids, content, media_urls, scheduled_at, status, ai_generated } = c.req.valid('json');
  const { DB } = c.env;
  const userId = (c.get('jwtPayload') as any).sub;
  const id = crypto.randomUUID();

  await DB.prepare(
    `INSERT INTO posts (id, user_id, channel_ids, content, media_urls, status, scheduled_at, ai_generated, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    userId,
    JSON.stringify(channel_ids),
    content,
    media_urls ? JSON.stringify(media_urls) : null,
    status,
    scheduled_at ?? null,
    ai_generated ? 1 : 0,
    Date.now()
  ).run();

  return c.json({ id, ...c.req.valid('json') }, 201);
});

posts.patch('/:id', zValidator('json', postSchema.partial()), async (c) => {
  const { DB } = c.env;
  const userId = (c.get('jwtPayload') as any).sub;
  const id = c.req.param('id');
  const updates = c.req.valid('json');

  const setClauses: string[] = [];
  const bindValues: any[] = [];

  if (updates.content !== undefined) { setClauses.push('content = ?'); bindValues.push(updates.content); }
  if (updates.status !== undefined) { setClauses.push('status = ?'); bindValues.push(updates.status); }
  if (updates.scheduled_at !== undefined) { setClauses.push('scheduled_at = ?'); bindValues.push(updates.scheduled_at); }
  if (updates.media_urls !== undefined) { setClauses.push('media_urls = ?'); bindValues.push(JSON.stringify(updates.media_urls)); }

  if (setClauses.length === 0) {
    return c.json({ error: 'No fields to update' }, 400);
  }

  bindValues.push(id, userId);
  await DB.prepare(`UPDATE posts SET ${setClauses.join(', ')} WHERE id = ? AND user_id = ?`).bind(...bindValues).run();

  return c.json({ success: true });
});

posts.delete('/:id', async (c) => {
  const { DB } = c.env;
  const userId = (c.get('jwtPayload') as any).sub;
  const id = c.req.param('id');
  await DB.prepare('DELETE FROM posts WHERE id = ? AND user_id = ?').bind(id, userId).run();
  return c.json({ success: true });
});

export { posts };
