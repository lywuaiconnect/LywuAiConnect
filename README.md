# LiwuAI Connect

AI-first social media management platform built entirely on Cloudflare's free tier (no credit card required).

## Stack

- **Frontend:** React + Tailwind CSS + shadcn/ui (Cloudflare Pages)
- **Backend:** Hono + Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite)
- **Cache/Sessions:** Cloudflare KV
- **File Storage:** Cloudflare R2
- **AI:** OpenRouter (free API key)
- **Image Generation:** Pollinations.ai (free, unlimited, no API key)
- **Deployment:** GitHub + Cloudflare Pages + Wrangler

## Features

- Connect social channels (Instagram, Facebook, TikTok, LinkedIn, X, Threads, Bluesky, etc.)
- Schedule posts with calendar view
- AI post enhancement via OpenRouter
- AI image generation via Pollinations.ai
- Unified comments inbox
- Analytics dashboard
- Free forever tier

## Free Tier Limits (Cloudflare)

| Service | Free Limit |
|---------|------------|
| Workers | 100k requests/day, 10ms CPU/request |
| D1 | 5GB storage, 5M reads/day |
| KV | 100k reads/day, 1k writes/day, 1GB storage |
| R2 | 10GB storage, 1M Class A / 10M Class B ops/mo |
| Pages | 500 builds/mo, unlimited static requests |

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up D1 database
npx wrangler d1 create liwuai-db

# Copy D1 database ID to wrangler.toml and .env

# Create KV namespace
npx wrangler kv:namespace create LIWUAI_SESSIONS

# Create R2 bucket
npx wrangler r2 bucket create liwuai-uploads

# Set secrets
npx wrangler secret put OPENROUTER_API_KEY
npx wrangler secret put JWT_SECRET

# Run migrations
npx wrangler d1 execute liwuai-db --file=packages/db/schema.sql

# Deploy API
cd apps/api && pnpm deploy

# Deploy frontend
cd ../web && pnpm deploy
```

## Project Structure

```
apps/api/     - Cloudflare Workers backend (Hono)
apps/web/     - Cloudflare Pages frontend (React)
packages/db/  - D1 database schema
packages/ui/  - Shared UI components
```
