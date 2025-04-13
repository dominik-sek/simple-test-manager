export const api = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      ...(token && {'Authorization': `Bearer ${token}`})
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    let errorMessage = `Request failed with status ${response.status}`;

    if (contentType?.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    }

    const error = new Error(errorMessage);
    (error as any).status = response.status;
    throw error;
  }
  return await response.json();
};
