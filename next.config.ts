import type { NextConfig } from "next";

/**
 * Everything this site loads is same-origin: next/font self-hosts the fonts,
 * images live in /public, the chat widget posts to /api/chat, and the
 * Cloudflare scripts in front of it (Rocket Loader, RUM, challenge platform)
 * are served from /cdn-cgi on this same host. So 'self' covers the lot.
 *
 * 'unsafe-inline' is unavoidable for now: Next.js emits inline hydration
 * scripts, Cloudflare Rocket Loader rewrites tags inline, and Framer Motion
 * writes inline styles. The policy still blocks script loads from any other
 * origin, framing, form posts elsewhere, and plugin content.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
