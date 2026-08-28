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
  /* config options here */
  reactCompiler: true,
  images: {
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
};

export default nextConfig;
