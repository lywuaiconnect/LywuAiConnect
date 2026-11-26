import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { generateText, generateImage } from '../lib/openrouter';

const ai = new Hono();

const chatSchema = z.object({
  message: z.string().min(1),
  context: z.string().optional(),
});

// AI Chat endpoint for AI Assistant chatbot
ai.post('/chat', zValidator('json', chatSchema), async (c) => {
  const { message, context } = c.req.valid('json');
  const apiKey = c.env.OPENROUTER_API_KEY as string;
  const baseUrl = c.env.OPENROUTER_BASE_URL as string;

  const contextHelp = {
    compose: 'User is on the AI Composer page. They need help with post generation, rewriting content, platform optimization, hashtags, and tone adjustment.',
    calendar: 'User is on the Calendar page. They need help with scheduling posts, drag-and-drop functionality, best time suggestions, and queue management.',
    analytics: 'User is on the Analytics page. They need help with engagement metrics, performance tracking, insights, and reports.',
    channels: 'User is on the Channels page. They need help with connecting social accounts, OAuth integrations, and platform setup.',
    inbox: 'User is on the Community Inbox page. They need help with managing comments, replies, sentiment analysis, and quick responses.',
    landing: 'User is on the landing page. They need help with getting started, feature overviews, and sign up guidance.',
  };

  const systemPrompt = `You are LiwuAI Connect's AI Assistant, a helpful chatbot that guides users through a social media management platform.

${context ? `Current context: ${contextHelp[context] || contextHelp.landing}` : ''}

Respond as if you are an intelligent, friendly assistant. Provide detailed, helpful answers. Do not mention that you are an AI model or that you are using external APIs. Be conversational and helpful.

When helping with:
- Scheduling: Guide step-by-step through Composer → Schedule workflow
- AI Features: Explain generate, rewrite, hashtag suggestions, tone adjustment
- Analytics: Describe metrics, reports, and insights
- Channels: Explain platform connections and OAuth
- General: Be helpful, use the emoji 💡 and provide actionable tips

Keep responses well-formatted with line breaks. Be concise but thorough.`;

  try {
    const reply = await generateText({
      apiKey,
      baseUrl,
      prompt: message,
      systemPrompt,
      model: 'openrouter/free',
    });

    return c.json({
      reply,
      source: 'openrouter',
      model: 'openrouter/free'
    });
  } catch (error) {
    console.error('AI Chat error:', error);
    return c.json({
      reply: `I'm having trouble connecting to my knowledge base right now. Let me help you directly:\n\n${getLocalHelp(message)}`,
      source: 'fallback',
      error: true
    }, 500);
  }
});

// Helper function for fallback responses
function getLocalHelp(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('schedule') || lower.includes('when to post') || (lower.includes('post') && lower.includes('time'))) {
    return `1. Click **"Composer"** in the top navigation\n2. **Write or paste** your content\n3. Click **"Schedule"** (not "Post Now")\n4. Choose your **date and time**\n5. Select which **channels** to post to\n\n💡 **Pro tip**: The Calendar shows AI-suggested optimal posting times!`;
  }

  if (lower.includes('composer') || lower.includes('ai') && lower.includes('write')) {
    return `The **AI Composer** helps you:\n\n• **Generate** post ideas automatically\n• **Rewrite** and improve existing content\n• **Optimize** for different platforms (Twitter, LinkedIn, Instagram)\n• **Add** relevant hashtags\n• **Adjust** tone (professional, casual, creative, energetic)\n\nJust type your idea and click **"Generate with AI"** to get instant, platform-optimized suggestions.`;
  }

  if (lower.includes('channel') || lower.includes('connect')) {
    return `To **connect social channels**:\n\n1. Go to the **Channels** tab\n2. Click **"Connect"** next to any platform\n3. You'll be redirected to the platform's OAuth\n4. Grant permission and you're done!\n\n**Supported platforms:** Instagram, Facebook, Twitter/X, LinkedIn, TikTok, Pinterest, Bluesky, Mastodon, Threads, YouTube\n\n💡 **Tip**: Business/Creator accounts are required for Instagram.`;
  }

  if (lower.includes('analytics') || lower.includes('performance')) {
    return `The **Analytics Dashboard** shows:\n\n• **Engagement rates** (likes, comments, shares)\n• **Reach and impressions** metrics\n• **Top performing posts** analysis\n• **Platform comparison** charts\n• **Audience insights** and growth trends\n\nNavigate to **Analytics** to see detailed reports and AI suggestions for improvement.`;
  }

  if (lower.includes('inbox') || lower.includes('comment') || lower.includes('reply')) {
    return `The **Community Inbox** helps you:\n\n• See **all comments** from all platforms in one place\n• Use **AI-powered reply suggestions**\n• Get **sentiment analysis** (positive/negative/neutral)\n• Send **quick reply templates**\n• **Assign comments** to team members\n\nClick **Inbox** in the navigation to manage all community interactions!`;
  }

  if (lower.includes('free') || lower.includes('cost') || lower.includes('price')) {
    return `**LiwuAI Connect is 100% FREE forever!** 💯\n\n• ✅ **No credit card required**\n• ✅ **Unlimited posts and scheduling**\n• ✅ **All basic features included**\n• ✅ **AI assistant access**\n• ✅ **Multi-platform support**\n\nCreated by the team behind LiwuAi - the AI website builder.`;
  }

  return `I can help you with:\n\n**📝 Posting & Content:**\n• Scheduling posts\n• AI content generation\n• Platform optimization\n\n**📊 Analytics:**\n• Performance tracking\n• Best time suggestions\n• Content insights\n\n**🔗 Management:**\n• Connecting channels\n• Team collaboration\n• Comment inbox\n\nTry asking me specific questions like:\n"How do I schedule my first post?"\n"What platforms can I connect?"\n"How does the AI composer work?"`;
}

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
