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
  const { status } = await request.json().catch(() => ({}));
  if (!status) {
    return Response.json({ error: "status tələb olunur" }, { status: 400, headers });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return Response.json(order, { status: 200, headers });
}
