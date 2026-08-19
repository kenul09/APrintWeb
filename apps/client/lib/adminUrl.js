// Helper to read admin URL from environment in a Vercel-safe way.
export function getAdminUrl() {
  // prefer NEXT_PUBLIC for Next.js, but also accept VITE_ADMIN_URL if set
  try {
    if (typeof process !== 'undefined') {
      // prefer NEXT_PUBLIC_ADMIN_URL for Next.js, then VITE_ADMIN_URL
      if (process.env.NEXT_PUBLIC_ADMIN_URL) return process.env.NEXT_PUBLIC_ADMIN_URL;
      if (process.env.VITE_ADMIN_URL) return process.env.VITE_ADMIN_URL;
    }
  } catch (e) {}

  // runtime browser fallbacks
  try {
    if (typeof window !== 'undefined') {
      if (window.__env && window.__env.VITE_ADMIN_URL) return window.__env.VITE_ADMIN_URL;
      // attempt to read import.meta.env at runtime without referencing import.meta at parse time
      try {
        const meta = new Function('return import.meta')();
        if (meta && meta.env && meta.env.VITE_ADMIN_URL) return meta.env.VITE_ADMIN_URL;
      } catch (e) {
        // ignore
      }
    }
  } catch (e) {}

  return '';
}
