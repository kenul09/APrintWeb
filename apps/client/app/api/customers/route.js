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

  const customers = await prisma.customer.findMany({ orderBy: { id: "asc" } });
  return Response.json(customers, { status: 200, headers });
}
