// Fetch wrapper for apps/backend (JWT bearer auth), separate from ./api.js
// which still talks to the legacy apps/client cookie-authenticated routes
// (orders/customers/admin-registration — not part of this migration).

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001/api';
const TOKEN_KEY = 'aprint_admin_token';

// VITE_BACKEND_URL is baked in at build time (Vite can't read it at
// runtime). If it wasn't set when this bundle was built, BACKEND_URL falls
// back to localhost — which silently makes every login/API request fail
// once this build is deployed anywhere but a developer's own machine. Flag
// that misconfiguration loudly instead of leaving it to look like a generic
// network error.
if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && BACKEND_URL.includes('localhost')) {
  console.error(
    '[admin] VITE_BACKEND_URL was not set when this build was created, so API requests are pointed at ' +
      `${BACKEND_URL} — which does not exist on this machine. Set VITE_BACKEND_URL to the deployed ` +
      'apps/backend URL in this project\'s Vercel environment variables and redeploy.'
  );
}

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

// Multipart upload (FormData). Deliberately does NOT set Content-Type —
// the browser must set it itself with the multipart boundary.
export async function backendUpload(path, formData) {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  let response;
  try {
    response = await fetch(`${BACKEND_URL}${path}`, { method: 'POST', body: formData, headers });
  } catch {
    throw new BackendRequestError('Serverə qoşulmaq mümkün olmadı', 0);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new BackendRequestError(body?.message || 'Xəta baş verdi', response.status, body?.errors);
  }

  return body;
}
