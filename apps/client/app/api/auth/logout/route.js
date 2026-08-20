import { deleteSession } from "@/lib/session";
import { corsHeaders, preflight } from "@/lib/cors";

export async function OPTIONS(request) {
  return preflight(request);
}

export async function POST(request) {
  await deleteSession();
  return Response.json({ success: true }, { status: 200, headers: corsHeaders(request) });
}
