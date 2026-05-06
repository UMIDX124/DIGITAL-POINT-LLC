import { AutomationOrbit } from '@/components/hero/AutomationOrbit';
import { HeroHeadline } from '@/components/hero/HeroHeadline';
import { HeroCTA } from '@/components/hero/HeroCTA';
import Hero3DStage from '@/components/hero/Hero3DStage';
import HeroScrollEnhance from '@/components/hero/HeroScrollEnhance';
import { copy } from '@/lib/copy';

/* Phase 20.1 premium hero — Hero3DStage is a Client Component
   ('use client'); direct import keeps HeroSection as a Server Component
   (Next 16 forbids next/dynamic ssr:false inside Server Components).
   Three.js bundle is code-split automatically by Turbopack via the
   dynamic await import('three') inside Hero3DStage's effect. SSR pass
   renders an empty canvas wrapper; the GPU work only happens client-side
   after gates pass (desktop + prefers-motion + hardware tier). */

/**
 * Phase 20.1 hero — ships the new 3D stage behind static content. The
 * Phase 19 nuke-lag rule (no client-side motion in HeroSection itself)
 * is preserved at the section level: this component remains pure server-
 * rendered markup. The 3D scene is a sibling component dynamic-imported
 * with ssr:false, so initial-bundle delta is zero. Reduced-motion / mobile
 * / low-CPU users see only the multi-color body atmosphere shipped in
 * Phase 20.1 Batch A — no broken-canvas surface.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="hero hero-section relative w-full overflow-hidden"
    >
      <Hero3DStage />
      <HeroScrollEnhance />
      <div className="hero-grid relative mx-auto w-full max-w-[90rem] z-10">
        <div className="hero-content">
          <p className="hero-eyebrow font-mono uppercase mb-8">
            {copy.hero.eyebrow}
          </p>

          <HeroHeadline />

          <p className="hero-sub font-body mb-10">
            {copy.hero.subhead}
          </p>

          <HeroCTA />
        </div>

        <div className="automation-orbit-container relative">
          <AutomationOrbit />
        </div>
      </div>
    </section>
  );
}
