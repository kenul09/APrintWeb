// Thin fetch wrapper around the standalone backend (apps/backend). Every
// resource-specific service (productService, portfolioService, ...) goes
// through this instead of calling fetch() directly, so the base URL, JSON
// handling and error shape only live in one place.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

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
