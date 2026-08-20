const DEFAULT_ADMIN_ORIGIN = "http://localhost:5178";

function allowedOrigin(request) {
  const configured = process.env.ADMIN_ORIGIN || DEFAULT_ADMIN_ORIGIN;
  const requestOrigin = request.headers.get("origin");
  return requestOrigin === configured ? requestOrigin : configured;
}

export function corsHeaders(request) {
  return {
    "Access-Control-Allow-Origin": allowedOrigin(request),
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export function preflight(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}
