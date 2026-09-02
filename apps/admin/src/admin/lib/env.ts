import { z } from 'zod';

// VITE_* vars are baked in at build time (Vite can't read them at runtime).
// Both have a localhost fallback so local `npm run dev` keeps working with
// zero .env setup — that fallback must stay, so validation checks the
// *resolved* value (env var or its fallback), never requires the env var
// itself to be present. This still catches real misconfiguration (a typo'd
// or malformed URL) without breaking the existing zero-config dev experience.
const DEFAULT_API_URL = 'http://localhost:3000';
const DEFAULT_BACKEND_URL = 'http://localhost:5001/api';

const envSchema = z.object({
  apiUrl: z.url({ message: 'VITE_API_URL must be a valid URL' }),
  backendUrl: z.url({ message: 'VITE_BACKEND_URL must be a valid URL' }),
});

const resolved = {
  apiUrl: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  backendUrl: import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL,
};

const result = envSchema.safeParse(resolved);

if (!result.success) {
  const details = result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
  throw new Error(`[env] Invalid environment configuration: ${details}`);
}

export type Env = z.infer<typeof envSchema>;

export const env: Env = result.data;

// Deployed anywhere but localhost while still pointing at a localhost URL
// means the corresponding VITE_* var wasn't set when this build was made —
// every request against it will fail. One shared check instead of the same
// logic duplicated per service file.
function warnIfLocalhostInProduction(name: string, url: string): void {
  if (typeof window === 'undefined') return;
  if (window.location.hostname === 'localhost') return;
  if (!url.includes('localhost')) return;
  console.error(
    `[admin] ${name} was not set when this build was created, so requests go to ${url} — ` +
      `which does not exist on this machine. Set ${name} in this project's Vercel environment ` +
      'variables and redeploy.'
  );
}

warnIfLocalhostInProduction('VITE_API_URL', env.apiUrl);
warnIfLocalhostInProduction('VITE_BACKEND_URL', env.backendUrl);
