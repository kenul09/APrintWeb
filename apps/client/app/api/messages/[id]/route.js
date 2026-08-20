import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { corsHeaders, preflight } from "@/lib/cors";

export async function OPTIONS(request) {
  return preflight(request);
}

export async function PATCH(request, { params }) {
  const headers = corsHeaders(request);
  const session = await verifySession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  const { id } = await params;
  const { read } = await request.json().catch(() => ({}));

  const message = await prisma.message.update({
    where: { id: Number(id) },
    data: { read: Boolean(read) },
  });

  return Response.json(message, { status: 200, headers });
}

export async function DELETE(request, { params }) {
  const headers = corsHeaders(request);
  const session = await verifySession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  const { id } = await params;
  await prisma.message.delete({ where: { id: Number(id) } });

  return new Response(null, { status: 204, headers });
}
