import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * English lives at the root URLs (/, /work/x), Turkish under /tr.
 * Both trees render from app/[lang], so bare paths are rewritten
 * (not redirected — the visible URL stays clean) to their /en form.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isTurkish = pathname === "/tr" || pathname.startsWith("/tr/");

  // not-found.tsx receives no params, so the locale travels as a header.
  const headers = new Headers(request.headers);
  headers.set("x-locale", isTurkish ? "tr" : "en");

  if (isTurkish) {
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, metadata routes (icon, opengraph-image, sitemap,
  // robots) and anything with a file extension (public/ assets).
  matcher: [
    "/((?!_next|icon|apple-icon|opengraph-image|twitter-image|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
