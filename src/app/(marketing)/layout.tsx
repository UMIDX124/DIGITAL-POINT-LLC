import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';
import { LenisProvider } from '@/components/motion/LenisProvider';
import { ScrollMotion } from '@/components/motion/ScrollMotion';

/**
 * Cosmo chatbot intentionally NOT mounted. SupportChatbot + the
 * src/lib/ai-chatbot orchestrator + /api/chat route were deleted in Phase 3a
 * once the 40 KB of unused AI SDK surface area was confirmed dead. Re-enable
 * by checking out a pre-3a SHA if ever wanted back.
 */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: '#0A0A0B' }}>
      <LenisProvider />
      <ScrollMotion />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCTABar />
    </div>
  );
}
