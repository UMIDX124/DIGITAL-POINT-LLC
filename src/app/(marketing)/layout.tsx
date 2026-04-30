import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';

/**
 * Phase 19 nuke-lag — ScrollMotion (IntersectionObserver + lazy GSAP
 * for workgrid scrub + workflow path draw) ALSO removed. Owner: "tooooo
 * much lag." Static-first; reveals re-introduced only as pure CSS
 * animations triggered on page-load if/when needed.
 */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCTABar />
    </div>
  );
}
