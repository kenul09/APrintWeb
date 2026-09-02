// Response shapes for apps/backend endpoints actually consumed by the files
// converted in Phase 1/2 (src/admin/lib/authService.js's login/me/register
// flow, via backend.ts's backendFetch). Extend this file only as more
// service files get converted to TypeScript in later phases — don't try to
// model the whole backend API surface up front.
//
// Verified directly against apps/backend/src/controllers/auth.controller.ts
// and apps/backend/src/middleware/error.middleware.ts, not guessed.

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  // apps/backend's own toSafeAdmin() types this as plain string (Prisma's
  // Role enum currently only has "ADMIN", but the backend doesn't declare
  // that as a literal type, so this shouldn't be narrower than what it
  // actually promises).
  role: string;
}

// POST /auth/login
export interface LoginResponse {
  success: true;
  token: string;
  user: AdminUser;
}

// GET /auth/me
export interface MeResponse {
  success: true;
  data: AdminUser;
}

// Every apps/backend error response shape (error.middleware.ts's
// errorHandler/notFoundHandler) — used to type what backendFetch's
// handleResponse() parses out of a non-ok response.
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}
