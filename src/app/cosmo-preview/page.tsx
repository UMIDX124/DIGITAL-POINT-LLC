/**
 * Temporary visual preview route for the CosmoOrb component (Phase 4b).
 * Remove in Phase 4c once the orb is mounted inside HeroSection.
 *
 * Route: /cosmo-preview
 * Indexing: `noindex, nofollow` via metadata so it cannot leak into search.
 */

import type { Metadata } from 'next';
import { CosmoOrb } from '@/components/cosmo/CosmoOrb';

export const metadata: Metadata = {
  title: 'Cosmo Orb — preview',
  robots: { index: false, follow: false, nocache: true },
};

export default function CosmoPreviewPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <section className="section-top pb-[var(--section-main)]">
        <div className="container-wide">
          <p className="eyebrow">Phase 4b · dev preview</p>
          <h1 className="font-hero mt-6 max-w-[18ch]" style={{ fontSize: 'var(--text-display)', color: 'var(--text-primary)' }}>
            Cosmo orb — standalone.
          </h1>
          <p className="mt-6 t-lead max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Decorative AI mascot. No chat, no AI SDK. Pure SVG + CSS + shared-RAF mouse follow. This route is temporary and will be removed when the orb lands in the hero section in Phase 4c.
          </p>
        </div>
      </section>

      <section className="section-main">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="text-center">
              <p className="eyebrow mb-6">size=&quot;sm&quot;</p>
              <CosmoOrb size="sm" />
            </div>
            <div className="text-center">
              <p className="eyebrow mb-6">size=&quot;md&quot; (default)</p>
              <CosmoOrb size="md" />
            </div>
            <div className="text-center">
              <p className="eyebrow mb-6">size=&quot;lg&quot;</p>
              <CosmoOrb size="lg" />
            </div>
          </div>

          <div className="mt-[var(--section-space-tight)] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <p className="eyebrow mb-6">mouseFollow=false</p>
              <CosmoOrb size="md" mouseFollow={false} />
            </div>
            <div className="text-center">
              <p className="eyebrow mb-6">scrollMorph=false</p>
              <CosmoOrb size="md" scrollMorph={false} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-main">
        <div className="container-wide text-center">
          <p className="t-small" style={{ color: 'var(--text-tertiary)' }}>
            Scroll up + down to verify IntersectionObserver pauses the orb animations when scrolled offscreen. Move the mouse to verify parallax (desktop only).
          </p>
        </div>
      </section>
    </main>
  );
}
