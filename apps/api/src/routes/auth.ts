import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { sign } from 'hono/jwt';

const auth = new Hono();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, name } = c.req.valid('json');
  const { DB } = c.env;

  // Check if user exists
  const existing = await DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) {
    return c.json({ error: 'User already exists' }, 409);
  }

  const id = crypto.randomUUID();
  await DB.prepare(
    'INSERT INTO users (id, email, password_hash, name, plan, created_at) VALUES (?, ?, ?, ?, ?, ?)'
  )
    .bind(id, email, password, name, 'free', Date.now())
    .run();

  const token = await sign({ sub: id, email }, c.env.JWT_SECRET as string);

  return c.json({ token, user: { id, email, name, plan: 'free' } });
});

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  const { DB } = c.env;

  const user = await DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  if (!user || (user as any).password_hash !== password) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const token = await sign({ sub: user.id, email }, c.env.JWT_SECRET as string);

  return c.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, plan: user.plan },
  });
});

auth.get('/me', async (c) => {
  const payload = c.get('jwtPayload');
  const { DB } = c.env;
  const user = await DB.prepare('SELECT id, email, name, plan FROM users WHERE id = ?')
    .bind(payload.sub)
    .first();
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json({ user });
});

export { auth };
