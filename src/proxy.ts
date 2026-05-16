import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JSONLD_HASHES } from '@/lib/jsonld';

// botid's BotIdClient ships its bootstrap as an unnonced inline <script
// dangerouslySetInnerHTML>. Until botid accepts a nonce prop, allow that
// exact script content by SHA-256. Recompute when the botid package version
// bumps OR the protect array in src/app/layout.tsx changes:
//   curl -s -b "" http://127.0.0.1:3000/ \
//     | perl -ne 'while(/<script>(\(\(\{protect:[^<]+)<\/script>/g){print $1}' \
//     | node -e "const d=require('fs').readFileSync(0,'utf8');console.log('sha256-'+require('crypto').createHash('sha256').update(d).digest('base64'));"
const BOTID_INLINE_HASH = "'sha256-puYZT6Pn58nTPrm94v+Pl/6t5/iTuAPYigH++/0Zsek='";

// Site-wide JSON-LD blocks are static — their SHA-256 hashes are computed
// at module load in src/lib/jsonld.ts and pinned in CSP, so the layout no
// longer needs `await headers()` for a per-request nonce. That unlocks
// edge caching of marketing routes.
const STATIC_INLINE_HASHES = [BOTID_INLINE_HASH, ...JSONLD_HASHES].join(' ');

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${STATIC_INLINE_HASHES} https:`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.vercel-scripts.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.vercel-insights.com https://*.vercel-scripts.com https://vitals.vercel-insights.com https://*.sentry.io https://*.ingest.us.sentry.io https://*.ingest.sentry.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');
}

export default function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID()).replace(/=+$/, '');
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
