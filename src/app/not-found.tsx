import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #0A0A0B 0%, #141416 50%, #0A0A0B 100%)' }}
    >
      <div className="text-center max-w-md">
        <h1
          className="font-display text-8xl font-bold mb-4"
          style={{
            background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </h1>
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          Page not found
        </h2>
        <p className="text-[#D6D0C2] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
