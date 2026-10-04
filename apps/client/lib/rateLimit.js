import "server-only";

// Fixed-window, in-memory rate limiter keyed by an arbitrary string (the
// client IP for login). Memory is per server instance, so on a multi-instance
// or serverless deployment each instance counts separately — good enough to
// stop casual brute force; use a shared store (e.g. Redis) for a hard limit.
const buckets = new Map();
const MAX_TRACKED_KEYS = 10_000;

function prune(now) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

// Returns { limited, remaining, retryAfterSeconds } and counts this attempt.
export function hit(key, { limit, windowMs }) {
  const now = Date.now();
  if (buckets.size > MAX_TRACKED_KEYS) prune(now);

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;

  return {
    limited: bucket.count > limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
  };
}

export function reset(key) {
  buckets.delete(key);
}

// First address in x-forwarded-for is the original client on Vercel and
// most reverse proxies; x-real-ip is the fallback.
export function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
