export async function generateText({
  apiKey,
  baseUrl,
  prompt,
  model = 'openrouter/free',
  systemPrompt = 'You are a helpful social media assistant.',
}: {
  apiKey: string;
  baseUrl: string;
  prompt: string;
  model?: string;
  systemPrompt?: string;
}) {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function generateImage(prompt: string) {
  // Pollinations.ai - free, unlimited, no API key required
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
}
