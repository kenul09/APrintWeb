import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { signToken } from "../utils/jwt";
import type { LoginInput, RegisterInput } from "../validators/auth.schema";

function toSafeAdmin(admin: { id: string; name: string; email: string; role: string }) {
  return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
}

export async function register({ name, email, password }: RegisterInput) {
  if (!env.registrationEnabled) {
    throw ApiError.forbidden("Qeydiyyat artıq bağlıdır");
  }

  // Case-insensitive uniqueness: normalize before checking and storing, so
  // "Admin@X.com" and "admin@x.com" can't both register.
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    throw ApiError.conflict("Bu email artıq qeydiyyatdan keçib.");
  }

  const hashed = await bcrypt.hash(password, 10);
  // Role is intentionally always ADMIN — it's the only role this schema
  // defines (see prisma/schema.prisma), so it's the correct, not an
  // elevated, value for every account created here.
  const admin = await prisma.admin.create({
    data: { name: name.trim(), email: normalizedEmail, password: hashed },
  });

  return toSafeAdmin(admin);
}

export async function login({ email, password }: LoginInput) {
  // Same normalization as register() — otherwise an account created as
  // "Admin@X.com" could never log back in with a differently-cased email.
  let admin;
  try {
    admin = await prisma.admin.findUnique({ where: { email: email.trim().toLowerCase() } });
  } catch (error) {
    // Never log the raw error object — Prisma errors can embed the DB host
    // in .message, but some wrapped causes carry more. Logging only .message
    // (and .code, when present) keeps the connection string/credentials out
    // of Vercel logs while still surfacing enough to diagnose from there.
    const code = error && typeof error === "object" && "code" in error ? (error as { code: unknown }).code : undefined;
    console.error(
      "[auth.service] Database error during login lookup:",
      error instanceof Error ? error.message : String(error),
      code ? `(code: ${code})` : ""
    );
    throw ApiError.internal("Verilənlər bazasına qoşulmaq mümkün olmadı");
  }

  if (!admin) {
    throw ApiError.unauthorized("Email və ya şifrə yanlışdır");
  }

  const passwordMatches = await bcrypt.compare(password, admin.password);
  if (!passwordMatches) {
    throw ApiError.unauthorized("Email və ya şifrə yanlışdır");
  }

  const token = signToken({ sub: admin.id, email: admin.email, role: admin.role });
  return { token, user: toSafeAdmin(admin) };
}

export async function getProfile(adminId: string) {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    throw ApiError.notFound("Admin not found");
  }
  return toSafeAdmin(admin);
}
