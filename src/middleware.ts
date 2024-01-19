import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiconfig from "./api/apiConfig";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(apiconfig.accessToken)?.value;

  if (!token) {
    // Redirect to /login if token is missing
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue to the next request handler if token is present
  return NextResponse.next();
}

// Optional: Apply middleware to specific routes (adjust as needed)
export const config = {
  matcher: ["/", "/add", "/[movieId]"], // Apply to selected routes
};
