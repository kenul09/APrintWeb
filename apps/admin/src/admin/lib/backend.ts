// Fetch wrapper for apps/backend (JWT bearer auth), separate from ./api.js
// which still talks to the legacy apps/client cookie-authenticated routes
// (orders/customers/admin-registration — not part of this migration).

import { env } from './env';
import type { ApiErrorResponse } from '../types/api';

const BACKEND_URL = env.backendUrl;
const TOKEN_KEY = 'aprint_admin_token';

// Dispatched whenever a backend request comes back 401 while a token was
// actually attached (i.e. the session was live but the token is now
// invalid/expired) — AdminLayout listens for this to redirect to /admin/login
// immediately instead of leaving the user stuck retrying with a dead token.
// Not fired for the login/register screens themselves: nothing listens there
// (AdminLayout only renders inside the already-authenticated route tree), so
// a normal "wrong password" 401 on those forms is unaffected. Carries no
// event detail — there's nothing to type there today.
export const UNAUTHORIZED_EVENT = 'admin:unauthorized';

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export class BackendRequestError extends Error {
  status: number;
  errors?: unknown;

  constructor(message: string, status: number, errors?: unknown) {
    super(message);
    this.name = 'BackendRequestError';
    this.status = status;
    this.errors = errors;
  }
}

// The parsed JSON body's real shape depends entirely on which endpoint was
// called (login response vs. a portfolio item vs. an error payload) — this
// is a generic low-level wrapper, not a per-endpoint client, so `unknown` is
// the honest type here. Callers narrow to their own expected shape (see
// src/admin/types/api.ts for the shapes defined so far).
async function handleResponse(response: Response, hadToken: boolean): Promise<unknown> {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && hadToken) {
      clearToken();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
      }
    }
    const errorBody = body as ApiErrorResponse | null;
    throw new BackendRequestError(errorBody?.message || 'Xəta baş verdi', response.status, errorBody?.errors);
  }

  return body;
}

export async function backendFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response: Response;
  try {
    response = await fetch(`${BACKEND_URL}${path}`, { ...options, headers });
  } catch {
    throw new BackendRequestError('Serverə qoşulmaq mümkün olmadı', 0);
  }

  return handleResponse(response, !!token);
}

// Multipart upload (FormData). Deliberately does NOT set Content-Type —
// the browser must set it itself with the multipart boundary.
export async function backendUpload(path: string, formData: FormData): Promise<unknown> {
  const token = getToken();
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  let response: Response;
  try {
    response = await fetch(`${BACKEND_URL}${path}`, { method: 'POST', body: formData, headers });
  } catch {
    throw new BackendRequestError('Serverə qoşulmaq mümkün olmadı', 0);
  }

  return handleResponse(response, !!token);
}
