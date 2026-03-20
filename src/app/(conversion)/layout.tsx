import Link from 'next/link';
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
          <div
            className="relative w-10 h-10 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(124,58,237,0.9) 100%)',
              boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
            }}
          >
            <svg viewBox="0 0 48 48" className="w-full h-full p-2">
              <path d="M8 8h16a16 16 0 0 1 0 32H8V8z" fill="currentColor" className="text-white/90" />
              <path d="M20 8h8a8 8 0 0 1 0 16h-8V8z" fill="currentColor" className="text-white" />
              <path d="M20 20h8a8 8 0 0 1 0 16h-8V20z" fill="currentColor" className="text-white" />
              <circle cx="38" cy="24" r="4" className="fill-[#ff6b6b]" />
            </svg>
          </div>
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
