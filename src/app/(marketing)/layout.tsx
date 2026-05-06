import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';

/* Phase 20 Loop A note: ChatWidget is mounted in the ROOT layout
   (src/app/layout.tsx) — it renders site-wide already. The audit C3 finding
   ("Cosmo advertised but no render path") is resolved by the Phase 20
   Sub-phase B copy + system-prompt fixes (CosmoMark in FAB, v3-phase20
   prompt with operator voice + correct service order); the mount itself
   was always there. Conversion layout (/free-growth-audit) does not strip
   it — a brief audit confirmed Cosmo also surfaces there via the root
   layout, which is acceptable given the audit form is the primary CTA
   anyway. */

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
