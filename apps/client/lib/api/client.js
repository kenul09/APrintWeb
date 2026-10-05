// Thin fetch wrapper around the standalone backend (apps/backend). Every
// resource-specific service (productService, portfolioService, ...) goes
// through this instead of calling fetch() directly, so the base URL, JSON
// handling and error shape only live in one place.

const isServer = typeof window === "undefined";
const DEFAULT_API_URL = "http://localhost:5001/api";
const TIMEOUT_MS = 5000;

// Node may resolve "localhost" to ::1 while the backend listens on IPv4
// only, which fails with ECONNREFUSED — so server-side requests use
// 127.0.0.1. API_URL (server-only, never sent to the browser) can point the
// server at a private/internal backend address; it falls back to the public
// NEXT_PUBLIC_API_URL.
function serverBaseUrl() {
  const url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  return url.replace("://localhost", "://127.0.0.1");
}

export const API_BASE_URL = isServer ? serverBaseUrl() : process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

// NEXT_PUBLIC_* vars are inlined into the client bundle at build time. If
// NEXT_PUBLIC_API_URL wasn't set when Vercel built this project, every
// browser that loads the deployed site silently ends up calling localhost
// (which doesn't exist for them) instead of the real backend.
if (!isServer && window.location.hostname !== "localhost" && API_BASE_URL.includes("localhost")) {
  console.error(
    `[client] NEXT_PUBLIC_API_URL was not set at build time, so API requests are pointed at ${API_BASE_URL}. ` +
      "Set NEXT_PUBLIC_API_URL to the deployed apps/backend URL in this project's Vercel environment variables and redeploy."
  );
}

class ApiRequestError extends Error {
  // status 0 = no HTTP response at all (connection refused, DNS, timeout).
  constructor(message, status, options) {
    super(message, options);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

// `options` is passed straight to fetch(), so server callers can add
// Next.js caching hints, e.g. { next: { revalidate: 300 } }.
export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const timeout = AbortSignal.timeout(TIMEOUT_MS);
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  const headers = options.body ? { "Content-Type": "application/json", ...options.headers } : options.headers;

  let response;
  try {
    response = await fetch(url, { ...options, headers, signal });
  } catch (error) {
    const reason =
      error?.name === "TimeoutError" ? `timeout after ${TIMEOUT_MS}ms` : error?.cause?.code || error?.code || error?.message;
    throw new ApiRequestError(`Could not reach the API at ${url} (${reason})`, 0, { cause: error });
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiRequestError(body?.message || `API responded with HTTP ${response.status}`, response.status);
  }

  return body;
}
