const BASE_URL = 'http://personal-dev.local/wp-json';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP Error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Use default error message if parsing fails
    }
    throw new ApiError(response.status, errorMessage);
  }
  return response.json();
};

export const authApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  register: async (username: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/notes-monkey/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(response);
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${BASE_URL}/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

export const notesApi = {
  getNotes: async (token: string) => {
    const response = await fetch(`${BASE_URL}/wp/v2/notes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getNote: async (token: string, id: number) => {
    const response = await fetch(`${BASE_URL}/wp/v2/notes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  createNote: async (token: string, data: { title: string; content: string; parent?: number }) => {
    const response = await fetch(`${BASE_URL}/wp/v2/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        parent: data.parent || 0,
      }),
    });
    return handleResponse(response);
  },

  updateNote: async (token: string, id: number, data: { title: string; content: string }) => {
    const response = await fetch(`${BASE_URL}/wp/v2/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteNote: async (token: string, id: number) => {
    const response = await fetch(`${BASE_URL}/wp/v2/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};