import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, internal files, and public media
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/analytics/export") ||
    pathname.includes(".") // static files like /favicon.ico, /manifest.json, /sw.js
  ) {
    return NextResponse.next();
  }

  // 2. Clone request headers to inject normalized edge geo and host info
  const requestHeaders = new Headers(request.headers);

  // Normalize Geo Country
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("x-country") ||
    "IN";
  requestHeaders.set("x-edge-country", country);

  // Normalize City
  const city =
    request.headers.get("x-vercel-ip-city") ||
    request.headers.get("cf-ipcity") ||
    "Unknown";
  requestHeaders.set("x-edge-city", city);

  // Normalize Host
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  requestHeaders.set("x-edge-host", host);

  // 3. Create response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 4. Inject Production-Grade Security Headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // 5. Performance cache header for redirect evaluation (prevent stale browser disk caches on dynamic links)
  if (!pathname.startsWith("/api") && !pathname.startsWith("/dashboard") && pathname.length > 1) {
    response.headers.set("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (.png, .jpg, .svg, .json)
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)",
  ],
};
