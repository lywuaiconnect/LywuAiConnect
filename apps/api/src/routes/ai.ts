import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { generateText, generateImage } from '../lib/openrouter';

const ai = new Hono();

const enhanceSchema = z.object({
  content: z.string().min(1),
  platform: z.enum(['instagram', 'facebook', 'tiktok', 'linkedin', 'x', 'threads', 'bluesky', 'pinterest', 'youtube', 'mastodon', 'substack']),
  tone: z.enum(['professional', 'casual', 'enthusiastic', 'minimal']).default('casual'),
});

ai.post('/enhance', zValidator('json', enhanceSchema), async (c) => {
  const { content, platform, tone } = c.req.valid('json');
  const apiKey = c.env.OPENROUTER_API_KEY as string;
  const baseUrl = c.env.OPENROUTER_BASE_URL as string;

  const charLimits: Record<string, number> = {
    x: 280, threads: 500, instagram: 2200, facebook: 63206,
    linkedin: 3000, bluesky: 300, pinterest: 500, youtube: 10000,
    mastodon: 500, substack: 10000,
  };

  const systemPrompt = `You are a social media copywriter. Rewrite the following content for ${platform} in a ${tone} tone. Keep it under ${charLimits[platform] ?? 2200} characters. Include relevant hashtags. Return only the rewritten text, no extra commentary.`;

  const enhanced = await generateText({ apiKey, baseUrl, prompt: content, systemPrompt });

  return c.json({ enhanced, platform, tone });
});

ai.post('/ideas', zValidator('json', z.object({
  topic: z.string().min(1),
  platform: z.string().optional(),
  count: z.number().min(1).max(10).default(5),
})), async (c) => {
  const { topic, platform, count } = c.req.valid('json');
  const apiKey = c.env.OPENROUTER_API_KEY as string;
  const baseUrl = c.env.OPENROUTER_BASE_URL as string;

  const systemPrompt = `Generate ${count} social media post ideas about "${topic}"${platform ? ` for ${platform}` : ''}. Return them as a JSON array of objects with "title" and "content" fields.`;

  const ideas = await generateText({ apiKey, baseUrl, prompt: topic, systemPrompt });

  try {
    const parsed = JSON.parse(ideas);
    return c.json({ ideas: parsed });
  } catch {
    return c.json({ ideas: [{ title: topic, content: ideas }] });
  }
});

export { ai };
