import { HeroHeadline } from '@/components/hero/HeroHeadline';
import { HeroCTA } from '@/components/hero/HeroCTA';
import Hero3DStage from '@/components/hero/Hero3DStage';
import HeroScrollEnhance from '@/components/hero/HeroScrollEnhance';
import { HeroSidePanels } from '@/components/hero/HeroSidePanels';
import { copy } from '@/lib/copy';

/* Phase 20.1.6 hero — single focal point composition. The Hero3DStage
   is the right-side focal element; copy column lives on the left.
   AutomationOrbit (the COSMO node graph) was removed: visual review
   showed it competed with the 3D mark for attention, breaking the
   "one focal point per scroll" Hubtown discipline. Hero3DStage
   remains the cinematic surface; HeroSidePanels render the section
   nav and telemetry rails. */

export function HeroSection() {
  return (
    <section
      id="hero"
      className="hero hero-section relative w-full overflow-hidden"
    >
      <Hero3DStage />
      <HeroSidePanels />
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

        <div className="hero-stage-spacer" aria-hidden="true" />
      </div>
    </section>
  );
}
