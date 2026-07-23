import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Turkish is the default and lives at the root URLs (/, /work/x); English
 * lives under /en. Both trees render from app/[lang], so bare paths are
 * rewritten (not redirected — the visible URL stays clean) to their /tr form.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Do not rewrite API endpoints
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Turkish used to live under /tr; it is now the root. Redirect the old
  // URLs so shared links and search results survive the swap.
  if (pathname === "/tr" || pathname.startsWith("/tr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  // not-found.tsx receives no params, so the locale travels as a header.
  const headers = new Headers(request.headers);
  headers.set("x-locale", isEnglish ? "en" : "tr");

  if (isEnglish) {
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/tr${pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, API routes, metadata routes and static assets.
  matcher: [
    "/((?!api|_next|icon|apple-icon|opengraph-image|twitter-image|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
