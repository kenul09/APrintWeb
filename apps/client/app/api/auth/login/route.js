import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { corsHeaders, preflight } from "@/lib/cors";

async function matchesEnvAdmin(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminPasswordHash || email !== adminEmail) return false;
  return bcrypt.compare(password, adminPasswordHash);
}

async function matchesDbAdmin(email, password) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

export async function OPTIONS(request) {
  return preflight(request);
}

export async function POST(request) {
  const headers = corsHeaders(request);

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400, headers });
  }

  const { email, password } = body ?? {};
  if (typeof email !== "string" || typeof password !== "string") {
    return Response.json({ error: "Email və ya şifrə yanlışdır" }, { status: 401, headers });
  }

  const valid = (await matchesEnvAdmin(email, password)) || (await matchesDbAdmin(email, password));
  if (!valid) {
    return Response.json({ error: "Email və ya şifrə yanlışdır" }, { status: 401, headers });
  }

  await createSession(email);
  return Response.json({ success: true }, { status: 200, headers });
}
