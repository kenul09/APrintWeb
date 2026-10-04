// Absolute origin of the public site, used for canonical/hreflang URLs,
// the sitemap, robots.txt and OpenGraph. Set NEXT_PUBLIC_SITE_URL in
// production; Vercel's production URL is the fallback.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");
