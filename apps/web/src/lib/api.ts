export async function apiRequest(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('liwuai_token');
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text().catch(() => '');
    throw new Error(error || `API error: ${response.status}`);
  }

  return response.json();
}

export const auth = {
  register: (data: { email: string; password: string; name: string }) =>
    apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => apiRequest('/api/auth/me'),
};

export const channels = {
  list: () => apiRequest('/api/channels'),
  create: (data: any) => apiRequest('/api/channels', { method: 'POST', body: JSON.stringify(data) }),
  remove: (id: string) => apiRequest(`/api/channels/${id}`, { method: 'DELETE' }),
};

export const posts = {
  list: () => apiRequest('/api/posts'),
  create: (data: any) => apiRequest('/api/posts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/api/posts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: string) => apiRequest(`/api/posts/${id}`, { method: 'DELETE' }),
};

export const ai = {
  enhance: (data: { content: string; platform: string; tone: string }) =>
    apiRequest('/api/ai/enhance', { method: 'POST', body: JSON.stringify(data) }),
  ideas: (data: { topic: string; platform?: string; count?: number }) =>
    apiRequest('/api/ai/ideas', { method: 'POST', body: JSON.stringify(data) }),
};

export const image = {
  generate: (data: { prompt: string; width?: number; height?: number }) =>
    apiRequest('/api/image/generate', { method: 'POST', body: JSON.stringify(data) }),
};
