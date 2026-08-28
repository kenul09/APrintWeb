export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// See lib/backend.js for why this check exists: VITE_* vars are baked in at
// build time, so a missing one in the Vercel build silently ships a
// localhost URL to production.
if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && API_BASE_URL.includes('localhost')) {
  console.error(
    '[admin] VITE_API_URL was not set when this build was created, so requests to apps/client (legacy ' +
      `orders/customers/admin-registration) are pointed at ${API_BASE_URL}. Set VITE_API_URL to the ` +
      'deployed apps/client URL in this project\'s Vercel environment variables and redeploy.'
  );
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  return response;
}
