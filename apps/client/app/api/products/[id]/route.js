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
  const { id: _ignored, ...data } = await request.json().catch(() => ({}));

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return Response.json(product, { status: 200, headers });
}

export async function DELETE(request, { params }) {
  const headers = corsHeaders(request);
  const session = await verifySession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  const { id } = await params;
  await prisma.product.delete({ where: { id: Number(id) } });

  return new Response(null, { status: 204, headers });
}
