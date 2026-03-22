import Link from 'next/link';
import Image from 'next/image';
import SupportChatbot from '@/components/ui-dp/SupportChatbot';

export default function ConversionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0d0815 0%, #080510 100%)' }}
    >
      {/* Minimal header — logo + back link */}
      <header className="relative z-10 px-6 py-5 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/Dp-logo1.png"
            alt="Digital Point LLC"
            width={44}
            height={44}
            priority
            style={{
              width: '40px',
              height: '40px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 8px 16px rgba(139,92,246,0.3))',
            }}
          />
          <span className="font-display font-semibold text-base text-white/90 hidden sm:block">
            Digital Point <span className="text-white/40 text-xs">LLC</span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M10 4L6 8L10 12" />
          </svg>
          Back to site
        </Link>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1">
        {children}
      </main>

      <SupportChatbot />
    </div>
  );
}
