import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In Next.js 16 the `middleware` file convention was renamed to `proxy`.
// This runs on the server before a request is completed — used here as a
// password gate that protects the whole site until a visitor authenticates.

const publicPaths = ["/password", "/api/auth"];

function isPublicPath(pathname: string) {
  return (
    publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    // Allow any static asset in /public (has a file extension, e.g. .svg .png .mp4)
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip the password gate for public paths.
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Password gate — require the access cookie set by /api/auth.
  const hasAccess = request.cookies.get("site_access")?.value === "granted";
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/password", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
