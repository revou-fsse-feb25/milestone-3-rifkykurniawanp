import { NextResponse } from "next/server";

/**
 * Next.js Middleware for Route Protection
 *
 * This middleware function runs before any requests are completed.
 * It checks if the user is authenticated for protected routes and
 * handles redirects appropriately.
 *
 * @param {NextRequest} request - The incoming request object
 * @returns {NextResponse} - Either a redirect response or passes the request through
 */
export default function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  console.log(`Middleware processing request to: ${path}`);

  // Check for authentication in two possible places:
  // 1. The specific authToken cookie (set by our custom logic)
  // 2. The next-auth.session-token cookie (set by NextAuth.js)
  const authToken = request.cookies.get("authToken")?.value;
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;

  // User is authenticated if either token exists
  const isAuthenticated = Boolean(authToken || sessionToken);

  // Define public paths that don't require authentication
  const publicPaths = [
    "/login",
    "/register",
    "/about",
    "/api/auth/error",
    "/description",
  ];
  const isPublicPath =
    publicPaths.includes(path) ||
    path.startsWith("/api/auth") ||
    // path.startsWith("/anime") ||
    path === "/";

  // Check if user is trying to access a protected route without authentication
  if (!isPublicPath && !isAuthenticated) {
    // Create the URL for the login page with a redirect parameter
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);

    console.log(`Redirecting unauthenticated user to login from ${path}`);

    // Redirect to login page with return URL
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already authenticated users away from login/register pages
  if (
    isPublicPath &&
    isAuthenticated &&
    (path === "/login" || path === "/register")
  ) {
    console.log(
      "Redirecting authenticated user from login/register to dashboard"
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For demonstration purposes, log authentication status
  console.log(
    `Access granted to ${path}, auth status: ${
      isAuthenticated ? "authenticated" : "public route"
    }`
  );

  // Continue with the request if the route is public or user is authenticated
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Apply middleware to all routes except static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
