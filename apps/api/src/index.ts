import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';

import { auth } from './routes/auth';
import { channels } from './routes/channels';
import { posts } from './routes/posts';
import { ai } from './routes/ai';
import { image } from './routes/image';
import { authMiddleware } from './middleware/auth';

const app = new Hono<{
  Bindings: {
    DB: D1Database;
    KV: KVNamespace;
    R2: R2Bucket;
    OPENROUTER_API_KEY: string;
    JWT_SECRET: string;
    OPENROUTER_BASE_URL: string;
    ASSETS: Fetcher;
  };
}>();

// Auto-initialize database schema on first request
let dbInitialized = false;

app.use('*', async (c, next) => {
  if (!dbInitialized) {
    try {
      const schema = `
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          name TEXT NOT NULL,
          image_url TEXT,
          open_router_key TEXT,
          plan TEXT NOT NULL DEFAULT 'free',
          created_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS channels (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          platform TEXT NOT NULL,
          account_name TEXT NOT NULL,
          access_token TEXT NOT NULL,
          refresh_token TEXT,
          expires_at INTEGER,
          connected_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS posts (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          channel_ids TEXT NOT NULL,
          content TEXT NOT NULL,
          media_urls TEXT,
          status TEXT NOT NULL DEFAULT 'draft',
          scheduled_at INTEGER,
          published_at INTEGER,
          ai_generated INTEGER NOT NULL DEFAULT 0,
          created_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS comments (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          channel_id TEXT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
          post_id TEXT REFERENCES posts(id) ON DELETE SET NULL,
          author_name TEXT NOT NULL,
          content TEXT NOT NULL,
          is_replied INTEGER NOT NULL DEFAULT 0,
          created_at INTEGER NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_channels_user ON channels(user_id);
        CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
        CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
        CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
      `;
      await c.env.DB.batch(schema.split(';').filter(s => s.trim()).map(s => c.env.DB.prepare(s)));
      dbInitialized = true;
      console.log('Database initialized successfully');
    } catch (e) {
      console.error('Database initialization failed:', e);
    }
  }
  await next();
});

app.use('*', logger());
app.use('*', cors());
app.use('*', secureHeaders());

// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'liwuai-api' }));

// Public auth routes
app.route('/api/auth', auth);

// Protected routes (require auth)
app.use('/api/*', authMiddleware);
app.route('/api/channels', channels);
app.route('/api/posts', posts);
app.route('/api/ai', ai);
app.route('/api/image', image);

// Serve Static Assets (React SPA on Cloudflare Pages / Workers Assets)
app.get('*', async (c) => {
  if (c.env.ASSETS && typeof c.env.ASSETS.fetch === 'function') {
    return await c.env.ASSETS.fetch(c.req.raw);
  }
  return c.text('LiwuAi Connect API Ready', 200);
});

export default app;
