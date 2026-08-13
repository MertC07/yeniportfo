import type { NextConfig } from "next";

/**
 * Everything this site loads is same-origin: next/font self-hosts the fonts,
 * images live in /public, the chat widget posts to /api/chat, and Cloudflare's
 * challenge platform is served from /cdn-cgi on this same host. So 'self'
 * covers the lot.
 *
 * 'unsafe-inline' is unavoidable for now: Next.js emits inline hydration
 * scripts, the opening overlay is skipped by an inline script in the document
 * head, and Framer Motion writes inline styles. The policy still blocks script
 * loads from any other origin, framing, form posts elsewhere, and plugin
 * content.
 */
// React's development build uses eval() for debugging tooling (stack
// reconstruction, hot reload). The production build never does, so the
// allowance is scoped to dev only and never ships.
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Belt and braces alongside frame-ancestors, for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Everything here is a local file under /public, resized on demand and
    // served back from /_next/image — same origin, so the img-src 'self'
    // above already covers it and the CSP needs nothing extra.
    //
    // AVIF first, WebP as the fallback: order matters, the first entry the
    // browser's Accept header matches is the one that gets served. AVIF is
    // roughly a third smaller than WebP on the photographic content here
    // (certificates, award photos, project screenshots), which is most of
    // what this site weighs.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
