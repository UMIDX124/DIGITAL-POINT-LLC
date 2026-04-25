import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #111114 50%, #0D0D0D 100%)' }}
    >
      <div className="text-center max-w-md">
        <h1
          className="font-display text-8xl font-bold mb-4"
          style={{
            background: 'linear-gradient(135deg, #A5B4FC 0%, #818CF8 50%, #6366F1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </h1>
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          Page not found
        </h2>
        <p style={{ color: '#A1A1AA' }} className="mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
