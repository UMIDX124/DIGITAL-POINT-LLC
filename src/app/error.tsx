'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Chunk-load failures (typical pattern on fresh Vercel deploys when
  // edge cache is cold and the origin briefly 503s a few chunks) get an
  // automatic hard reload. By the time the page comes back, the edge
  // has warmed and the chunks land. Logged to Sentry via the SDK on the
  // window, so we still see the rate.
  useEffect(() => {
    const isChunkLoadError =
      error?.name === 'ChunkLoadError' ||
      /Loading chunk \d+ failed|Failed to fetch dynamically imported module|ChunkLoadError/i.test(
        error?.message ?? '',
      );
    if (isChunkLoadError) {
      // Capture explicitly so Sentry sees the recovery even though we reload.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w?.Sentry?.captureException) {
        try {
          w.Sentry.captureException(error, { tags: { recovery: 'chunk-reload' } });
        } catch {
          // Sentry failed; not blocking the reload.
        }
      }
      window.location.reload();
    }
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #111114 50%, #000000 100%)' }}
    >
      <div className="text-center max-w-md">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'rgba(255, 107, 107, 0.15)',
            border: '1px solid rgba(255, 107, 107, 0.3)',
          }}
        >
          <span className="text-2xl">!</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        <p style={{ color: 'var(--text-secondary)' }} className="mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 cursor-pointer"
          style={{ background: 'var(--color-accent)' }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
