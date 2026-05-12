import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
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
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Phase 20.1.7 — security audit closures.
          // HSTS: enforce HTTPS for two years, opt into preload list.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Cross-origin process isolation.
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
};

export default withBotId(nextConfig);
