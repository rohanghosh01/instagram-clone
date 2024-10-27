import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Get the session ID from cookies
  const sessionId = req.cookies.get("session")?.value 

  // If session is missing and user is not on the login page, redirect to login
  if (!sessionId && !req.nextUrl.pathname.startsWith("/accounts")) {
    return NextResponse.redirect(new URL("/accounts", req.url));
  }

  // If session exists and the requested path starts with "/accounts", deny access
  if (sessionId && req.nextUrl.pathname.startsWith("/accounts")) {
    // Redirect to a different route, for example, the home page
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Continue to the requested route if the conditions above are not met
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    // Apply middleware to all routes except for login and API routes
    "/((?!api|_next|static|images|public).*)",
  ],
};
