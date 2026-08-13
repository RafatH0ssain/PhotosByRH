import type { NextConfig } from "next";

// ─── Content Security Policy ────────────────────────────────────────────────
//
// Directives are assembled as an array so each line is readable and auditable.
//
// CSRF: not applicable — this app has no API routes. The contact form POSTs
// directly to Formspree (external service) via client-side fetch; there is no
// server-side mutation surface to protect.
//
// script-src 'unsafe-inline': required because Next.js injects inline <script>
// tags for hydration data (__NEXT_DATA__). A nonce-based approach (more strict)
// would require a middleware.ts that generates a per-request nonce — implement
// that if this site ever adds authenticated routes or sensitive data.
//
// connect-src ws://localhost:*: added only in development for Next.js HMR
// WebSocket connections. Stripped from production builds automatically.
//
// img-src data:: required for the CSS film-grain overlay in globals.css which
// uses a data-URI SVG as a background-image (Chromium routes CSS data-URIs
// through img-src).
//
// upgrade-insecure-requests: only emitted in production so local dev (HTTP)
// is not broken.
// ─────────────────────────────────────────────────────────────────────────────

const isDev = process.env.NODE_ENV !== "production";

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://formspree.io${isDev ? " ws://localhost:* wss://localhost:*" : ""}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  ...(!isDev ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  // Block MIME-type sniffing attacks
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Clickjacking — legacy header, kept for older browsers;
  // frame-ancestors in CSP above is the modern equivalent
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // The legacy XSS auditor has known bypasses and was removed from Chrome/Edge.
  // Setting to 0 explicitly disables it; the CSP script-src is the real guard.
  {
    key: "X-XSS-Protection",
    value: "0",
  },
  // Only send the origin (no path) as the referrer on cross-origin requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable browser features this site does not use
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  // Isolate the browsing context from anything that opens or embeds us.
  // Cheap on a static site with no auth, no popups and no cross-origin embeds.
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  // HSTS — forces HTTPS for 2 years, including subdomains.
  // The `preload` flag makes the domain eligible for browser preload lists.
  // Only meaningful in production (the site must be served over HTTPS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy (assembled above)
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        // Apply to every route, including _next/static assets and API routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
