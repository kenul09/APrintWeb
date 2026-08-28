// Thin fetch wrapper around the standalone backend (apps/backend). Every
// resource-specific service (productService, portfolioService, ...) goes
// through this instead of calling fetch() directly, so the base URL, JSON
// handling and error shape only live in one place.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// NEXT_PUBLIC_* vars are inlined into the client bundle at build time. If
// NEXT_PUBLIC_API_URL wasn't set when Vercel built this project, every
// browser that loads the deployed site silently ends up calling localhost
// (which doesn't exist for them) instead of the real backend.
if (typeof window !== "undefined" && window.location.hostname !== "localhost" && API_BASE_URL.includes("localhost")) {
  console.error(
    `[client] NEXT_PUBLIC_API_URL was not set at build time, so API requests are pointed at ${API_BASE_URL}. ` +
      "Set NEXT_PUBLIC_API_URL to the deployed apps/backend URL in this project's Vercel environment variables and redeploy."
  );
}

export class ApiRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

export async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
  } catch {
    throw new ApiRequestError("Serverə qoşulmaq mümkün olmadı", 0);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiRequestError(body?.message || "Xəta baş verdi", response.status);
  }

  return body;
}
