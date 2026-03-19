import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #0d0815 0%, #1a0a2e 50%, #0d0815 100%)' }}
    >
      <div className="text-center max-w-md">
        <h1
          className="font-display text-8xl font-bold mb-4"
          style={{
            background: 'linear-gradient(135deg, #e0aaff 0%, #c77dff 50%, #ff6b9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </h1>
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          Page not found
        </h2>
        <p className="text-[#b794c7] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
