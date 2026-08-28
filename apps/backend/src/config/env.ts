import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// CLIENT_URL/ADMIN_URL accept a comma-separated list (the .env.example
// comment already documented this; the CORS check just wasn't honoring it).
// Needed in production because a Vercel project can be reachable at more
// than one origin at once (a custom domain plus its default *.vercel.app
// URL, or a preview deployment) — without this, CORS would silently reject
// any origin beyond the single one someone happened to configure first.
function parseOrigins(value: string | undefined, fallback: string): string[] {
  return (value ?? fallback)
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  databaseUrl: required("DATABASE_URL"),
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "8h",
  clientUrls: parseOrigins(process.env.CLIENT_URL, "http://localhost:3000"),
  adminUrls: parseOrigins(process.env.ADMIN_URL, "http://localhost:5178"),

  // Self-service admin registration (POST /api/auth/register). Enabled by
  // default so the admin panel works out of the box; set to "false" once
  // your team's accounts exist to close it without a code change.
  registrationEnabled: process.env.REGISTRATION_ENABLED !== "false",

  // Contact-form notification email. Left unrequired on purpose — if SMTP
  // isn't configured, email.service.ts logs a warning and skips sending
  // rather than crashing the API (the ContactMessage is already saved).
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT ?? 465),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
  },
  // The business inbox that must receive every contact submission.
  adminEmail: process.env.ADMIN_EMAIL || "asadov_78@mail.ru",
};

export const isProduction = env.nodeEnv === "production";
