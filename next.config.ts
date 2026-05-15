import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';
import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

// F·15. Gate the analyzer on the ANALYZE env var so dev builds stay fast.
// Usage: `ANALYZE=1 pnpm build` opens the chunk graph in a browser tab.
// Surfaces vendor chunks ripe for lazy-loading (three.js, gsap, lenis,
// framer-motion). The 15-async-chunk profile that the audit captured is
// the starting point; iterate the dynamic() imports until top three
// chunks fit under a single combined 200 KB budget.
const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === '1' });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      // New positioning: legacy pillar URLs route to new pillars.
      { source: '/performance-marketing', destination: '/automation', permanent: true },
      { source: '/remote-workforce', destination: '/operators', permanent: true },
      { source: '/systems-reporting', destination: '/agents', permanent: true },
      // /free-growth-audit becomes the audit canonical at /audit.
      { source: '/free-growth-audit', destination: '/audit', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Phase 20.1.7 — security audit closures.
          // HSTS: enforce HTTPS for two years, opt into preload list.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Cross-origin process isolation.
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
      // F·04. Public cache for marketing routes. The root layout's
      // `await headers()` (CSP nonce) forces dynamic render, so the
      // origin response can't be statically cached, but the Vercel
      // edge can hold the rendered HTML for 5 min and serve stale
      // for 24h while revalidating. API routes excluded.
      {
        source: '/((?!api/|_next/|favicon).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

// Sentry build-time wiring. Source maps upload + tunnel route only kick
// in when SENTRY_AUTH_TOKEN / SENTRY_ORG / SENTRY_PROJECT envs are set;
// safe to keep wrapped even with no Sentry account yet.
const withSentry = (cfg: NextConfig) =>
  withSentryConfig(cfg, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
  });

export default withSentry(bundleAnalyzer(withBotId(nextConfig)));
