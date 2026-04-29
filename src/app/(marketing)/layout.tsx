import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';
import { ScrollMotion } from '@/components/motion/ScrollMotion';
import { ScrollProgressBar } from '@/components/effects/ScrollProgressBar';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';

/**
 * Phase 19 — repo-owner authorized supersedure of the Phase 8 "no Lenis"
 * lock. SmoothScrollProvider mounts Lenis with the official GSAP
 * ScrollTrigger bridge (lenis ticker drives gsap.ticker; ScrollTrigger
 * uses lenis as scroller proxy). prefers-reduced-motion: Lenis skipped
 * (native scroll). Anchor links: intercepted globally; lenis.scrollTo
 * handles hash navigation so #services / #stat-strip behave correctly.
 *
 * ScrollProgressBar (2px amber top-of-viewport) sits above all content.
 *
 * Groq AI chatbot is mounted at the root layout so it persists across
 * routes including marketing.
 */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen flex flex-col">
        <ScrollProgressBar />
        <ScrollMotion />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCTABar />
      </div>
    </SmoothScrollProvider>
  );
}
