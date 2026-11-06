import path from "node:path";

// Portfolio images uploaded via the admin panel are served by apps/backend
// itself (POST /api/portfolio/upload -> GET /uploads/portfolio/<file>), so
// next/image needs that origin allow-listed too. Derived from the same
// NEXT_PUBLIC_API_URL already used by lib/api/client.js, so this tracks
// whatever backend URL is actually configured in dev vs. production instead
// of a hardcoded guess.
let backendImagePattern;
try {
  const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api');
  backendImagePattern = {
    protocol: apiUrl.protocol.replace(':', ''),
    hostname: apiUrl.hostname,
    ...(apiUrl.port ? { port: apiUrl.port } : {}),
    pathname: '/uploads/**',
  };
} catch {
  backendImagePattern = { protocol: 'http', hostname: 'localhost', port: '5001', pathname: '/uploads/**' };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // The repo has lockfiles at the root and in each app (not a workspace);
  // pin Turbopack's root to the monorepo root explicitly, which is what it
  // inferred anyway, so the "multiple lockfiles" warning goes away.
  turbopack: {
    root: path.join(import.meta.dirname, "..", ".."),
  },
  experimental: {
    // app/global-not-found.js — the root layout lives under app/[lang].
    globalNotFound: true,
    // All CSS is ~10 KB; inlining it removes three render-blocking requests.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
        pathname: '/**',
      },
      backendImagePattern,
      // Vercel Blob's public CDN always serves from this stable domain
      // pattern (see apps/backend/src/services/storage.service.ts) — added
      // proactively so uploads work immediately once BLOB_READ_WRITE_TOKEN
      // is configured in production, no further config-file change needed.
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
    // Next 16's SSRF hardening blocks the image optimizer from proxying to
    // localhost/private IPs even when the hostname is allow-listed above —
    // required in dev since apps/backend runs on localhost. See:
    // https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowlocalip
    dangerouslyAllowLocalIP: true,
  },
  // /admin and /admin/* -> apps/admin (separate Vite app, port 5178 in dev —
  // see apps/admin/vite.config.ts). The admin's routes themselves live under
  // /admin, so deep links keep their path (/admin/products -> <admin>/admin/products).
  async redirects() {
    const adminUrl = (process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5178').replace(/\/+$/, '');
    return [
      {
        source: '/admin/:path*',
        destination: `${adminUrl}/admin/:path*`,
        permanent: false,
      },
      // A locale-prefixed admin URL (typed, autocompleted from history, or an
      // old link) would otherwise hit [lang]/[...rest] and 404.
      {
        source: '/:lang(az|en|ru)/admin/:path*',
        destination: `${adminUrl}/admin/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
