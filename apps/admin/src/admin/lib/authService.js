import { backendFetch, setToken, clearToken, getToken } from './backend';

export const authService = {
  async register(name, email, password) {
    const { data } = await backendFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return data;
  },

  async login(email, password) {
    const { token, user } = await backendFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(token);
    return user;
  },

  async me() {
    if (!getToken()) return null;
    try {
      const { data } = await backendFetch('/auth/me');
      return data;
    } catch {
      clearToken();
      return null;
    }
  },

  logout() {
    clearToken();
  },
};
