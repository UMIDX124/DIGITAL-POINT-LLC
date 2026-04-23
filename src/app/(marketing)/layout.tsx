import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';
import { LenisProvider } from '@/components/motion/LenisProvider';
import { ScrollMotion } from '@/components/motion/ScrollMotion';

/**
 * Cosmo chatbot (SupportChatbot) is intentionally NOT mounted.
 * See Phase 2 of the April 2026 rebuild — chatbot disabled pending a rewrite
 * because its copy contradicted the "no AI-only report" hero line and its
 * Groq key was misconfigured. Files preserved at
 * src/components/ui-dp/SupportChatbot.tsx for future re-enablement.
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
