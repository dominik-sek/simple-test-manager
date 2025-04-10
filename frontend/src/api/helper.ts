export const api = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`/api${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'API Error');
  }
  const data = await response.json();
  return data;
};
