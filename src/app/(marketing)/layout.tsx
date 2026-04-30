import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';
import { ScrollMotion } from '@/components/motion/ScrollMotion';

/**
 * Phase 19 Path 3 trim — Lenis SmoothScrollProvider removed. Owner
 * feedback: "website feels heavy/laggy." Removing the smooth-scroll
 * layer + its rAF bridge cuts per-frame work; native scroll restored.
 * ScrollMotion (intersection-observer reveals) preserved.
 */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollMotion />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCTABar />
    </div>
  );
}
