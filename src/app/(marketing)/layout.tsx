import dynamic from 'next/dynamic';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StickyCTABar } from '@/components/ui-dp/StickyCTABar';

/* Phase 20 Loop A Sub-phase B — Cosmo re-enabled. ChatWidget loads
   client-side only (next/dynamic ssr:false) so the inline SVG FAB
   doesn't ship in the SSR pass. Resolves audit finding C3 (Cosmo
   advertised but no render path). System prompt + chat panel + API
   route /api/chat were already in place; this mounts the surface. */
const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), {
  ssr: false,
  loading: () => null,
});

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
      <ChatWidget />
    </div>
  );
}
