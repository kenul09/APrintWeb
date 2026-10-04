import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8h
const SAME_SITE_VALUES = ["lax", "strict", "none"];

// SESSION_SAMESITE=lax|strict|none (default "lax"). "none" is only needed
// when the admin SPA calls these routes from another site, and browsers
// require Secure with it, so it is forced on in that case.
function getSameSite() {
  const value = (process.env.SESSION_SAMESITE || "lax").toLowerCase();
  return SAME_SITE_VALUES.includes(value) ? value : "lax";
}

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return new TextEncoder().encode(secret);
}

async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

async function decrypt(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(email) {
  const token = await encrypt({ email });
  const cookieStore = await cookies();
  const sameSite = getSameSite();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || sameSite === "none",
    sameSite,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const payload = await decrypt(token);
  return payload?.email ? { email: payload.email } : null;
}
