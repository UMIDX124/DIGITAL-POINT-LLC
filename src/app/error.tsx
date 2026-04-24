'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #111114 50%, #0D0D0D 100%)' }}
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
        <p style={{ color: '#A1A1AA' }} className="mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
