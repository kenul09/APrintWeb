import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { corsHeaders, preflight } from "@/lib/cors";

export async function OPTIONS(request) {
  return preflight(request);
}

export async function GET(request) {
  const headers = corsHeaders(request);
  const session = await verifySession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(messages, { status: 200, headers });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body?.name?.trim() || !body?.email?.trim() || !body?.phone?.trim() || !body?.message?.trim()) {
    return Response.json({ error: "required" }, { status: 400 });
  }
  if (!/\S+@\S+\.\S+/.test(body.email)) {
    return Response.json({ error: "invalidEmail" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      service: body.service || null,
      message: body.message.trim(),
      date: new Date().toLocaleDateString("az-AZ", { day: "numeric", month: "short" }),
    },
  });

  return Response.json(message, { status: 201 });
}
