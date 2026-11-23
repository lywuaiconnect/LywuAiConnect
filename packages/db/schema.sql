-- LiwuAI Connect Database Schema
-- Run with: npx wrangler d1 execute liwuai-db --file=packages/db/schema.sql

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
