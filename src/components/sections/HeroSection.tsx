import { AutomationOrbit } from '@/components/hero/AutomationOrbit';
import { HeroHeadline } from '@/components/hero/HeroHeadline';
import { HeroCTA } from '@/components/hero/HeroCTA';
import { copy } from '@/lib/copy';

/**
 * Phase 19 nuke-lag — HeroSection converted to a pure server component.
 * Owner feedback: "tooooooo much lag." All client-side motion removed:
 *   - GSAP timeline (removed)
 *   - 2× ScrollTrigger scrub (orb scale-down + eyebrow translate)
 *   - GSAP word-reveal cascade
 *   - Safety-net setTimeout
 *   - useEffect entirely
 *
 * Hero now ships static markup + AutomationOrbit (which has its own
 * minimal CSS rotation, prefers-reduced-motion safe). Server-rendered.
 * Zero JS cost on this section.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="hero hero-section relative w-full overflow-hidden"
    >
      <div className="hero-grid relative mx-auto w-full max-w-[90rem]">
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
