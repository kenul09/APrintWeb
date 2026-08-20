import { verifySession } from "@/lib/session";
import { corsHeaders, preflight } from "@/lib/cors";

export async function OPTIONS(request) {
  return preflight(request);
}

export async function GET(request) {
  const session = await verifySession();
  return Response.json(
    { authenticated: Boolean(session) },
    { status: 200, headers: corsHeaders(request) }
  );
}
