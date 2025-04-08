export const login = async (username: string, password: string) => {
  const response = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })

  });


  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'API Error');
  }
  const data = await response.json();
  return data;
};
