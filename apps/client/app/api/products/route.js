import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { corsHeaders, preflight } from "@/lib/cors";

export async function OPTIONS(request) {
  return preflight(request);
}

export async function GET(request) {
  const headers = corsHeaders(request);
  const activeOnly = new URL(request.url).searchParams.get("active") === "true";

  const products = await prisma.product.findMany({
    where: activeOnly ? { active: true } : undefined,
    orderBy: { id: "asc" },
  });

  return Response.json(products, { status: 200, headers });
}

export async function POST(request) {
  const headers = corsHeaders(request);
  const session = await verifySession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.price) {
    return Response.json({ error: "title və price tələb olunur" }, { status: 400, headers });
  }

  const product = await prisma.product.create({
    data: {
      title: body.title,
      price: body.price,
      icon: body.icon || "🖨️",
      category: body.category || "Çap",
      active: true,
    },
  });

  return Response.json(product, { status: 201, headers });
}
