import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import SupportChatbot from '@/components/ui-dp/SupportChatbot';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';
import { ExitIntentModal } from '@/components/ui-dp/ExitIntentModal';

// Pre-computed star positions (deterministic for SSR)
const starPositions = Array.from({ length: 15 }, (_, i) => ({
  top: ((i * 17 + 7) % 100),
  left: ((i * 23 + 13) % 100),
  delay: (i % 5),
  duration: 2 + (i % 3),
}));

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0d0815 0%, #080510 100%)' }}
    >
      {/* Cosmic background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(157, 78, 221, 0.08) 0%, transparent 50%)',
        }}
      />

      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        {starPositions.map((star, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>

      <SupportChatbot />
      <StickyCTABar />
      <ExitIntentModal />
    </div>
  );
}
