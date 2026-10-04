import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { corsHeaders, preflight } from "@/lib/cors";

// Registration is off unless explicitly enabled. In production that means
// ALLOW_ADMIN_REGISTRATION=true must be set; in development it is allowed
// by default so the first admin can be created locally.
function registrationEnabled() {
  if (process.env.ALLOW_ADMIN_REGISTRATION === "true") return true;
  return process.env.NODE_ENV !== "production";
}

async function registrationAvailable() {
  if (!registrationEnabled()) return false;
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH) return false;
  const existing = await prisma.admin.findFirst({ select: { id: true } });
  return !existing;
}

export async function OPTIONS(request) {
  return preflight(request);
}

export async function GET(request) {
  const headers = corsHeaders(request);
  return Response.json({ available: await registrationAvailable() }, { status: 200, headers });
}

export async function POST(request) {
  const headers = corsHeaders(request);

  if (!(await registrationAvailable())) {
    return Response.json({ error: "Qeydiyyat artıq bağlıdır" }, { status: 403, headers });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400, headers });
  }

  const { name, email, password } = body ?? {};
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.includes("@") ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return Response.json(
      { error: "Ad Soyad, düzgün email və ən azı 8 simvollu şifrə tələb olunur" },
      { status: 400, headers }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.admin.create({ data: { name: name.trim(), email, passwordHash } });
  } catch (error) {
    console.error("[auth/register] Failed to create admin:", error);
    return Response.json({ error: "Qeydiyyat mümkün olmadı" }, { status: 409, headers });
  }

  await createSession(email);
  return Response.json({ success: true }, { status: 201, headers });
}
