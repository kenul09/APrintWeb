// Fetch wrapper for apps/backend (JWT bearer auth), separate from ./api.js
// which still talks to the legacy apps/client cookie-authenticated routes
// (orders/customers/admin-registration — not part of this migration).

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001/api';
const TOKEN_KEY = 'aprint_admin_token';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export class BackendRequestError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = 'BackendRequestError';
    this.status = status;
    this.errors = errors;
  }
}

export async function backendFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${BACKEND_URL}${path}`, { ...options, headers });
  } catch {
    throw new BackendRequestError('Serverə qoşulmaq mümkün olmadı', 0);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new BackendRequestError(body?.message || 'Xəta baş verdi', response.status, body?.errors);
  }

  return body;
}
