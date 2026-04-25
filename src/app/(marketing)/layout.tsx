import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';
import { ScrollMotion } from '@/components/motion/ScrollMotion';

/**
 * Phase 8: LenisProvider fully removed. Native scroll is the design choice
 * for marketing — felt smoother on macOS/iOS native momentum than a
 * RAF-throttled wrapper.
 *
 * Groq AI chatbot is mounted at the root layout (src/app/layout.tsx) so
 * it persists across all routes including marketing.
 */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: '#0A0A0B' }}>
      <ScrollMotion />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCTABar />
    </div>
  );
}
