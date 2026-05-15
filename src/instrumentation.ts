// Next.js calls this once at server start (nodejs runtime + edge runtime).
// Sentry initialization is gated on NEXT_PUBLIC_SENTRY_DSN / SENTRY_DSN
// being set in env — without it, nothing loads and nothing breaks.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

// Forwards unhandled server-side request errors to Sentry. The export
// name is what Next.js looks for — don't rename.
export { captureRequestError as onRequestError } from '@sentry/nextjs';
