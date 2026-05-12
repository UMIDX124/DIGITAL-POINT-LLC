import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// botid's BotIdClient ships its bootstrap as an unnonced inline <script
// dangerouslySetInnerHTML>. Until botid accepts a nonce prop, allow that
// exact script content by SHA-256. Recompute when the botid package version
// bumps OR the protect array in src/app/layout.tsx changes:
//   curl -s -b "" http://127.0.0.1:3000/ \
//     | perl -ne 'while(/<script>(\(\(\{protect:[^<]+)<\/script>/g){print $1}' \
//     | node -e "const d=require('fs').readFileSync(0,'utf8');console.log('sha256-'+require('crypto').createHash('sha256').update(d).digest('base64'));"
const BOTID_INLINE_HASH = "'sha256-puYZT6Pn58nTPrm94v+Pl/6t5/iTuAPYigH++/0Zsek='";

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${BOTID_INLINE_HASH} https:`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://picsum.photos https://*.vercel-scripts.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.vercel-insights.com https://*.vercel-scripts.com https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');
}

export default function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID()).replace(/=+$/, '');
  const csp = buildCsp(nonce);
  const hasIntroCookie = request.cookies.get('dpl_i')?.value === '1';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  if (hasIntroCookie) requestHeaders.set('x-intro-seen', '1');

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Content-Security-Policy', csp);

  if (!hasIntroCookie) {
    response.cookies.set('dpl_i', '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
