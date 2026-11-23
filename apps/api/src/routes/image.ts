import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { generateImage } from '../lib/openrouter';

const image = new Hono();

const imageSchema = z.object({
  prompt: z.string().min(1).max(500),
  width: z.number().min(256).max(1024).default(1024),
  height: z.number().min(256).max(1024).default(1024),
});

image.post('/generate', zValidator('json', imageSchema), async (c) => {
  const { prompt, width, height } = c.req.valid('json');
  const imageUrl = generateImage(prompt);
  return c.json({ imageUrl, prompt, width, height });
});

export { image };
