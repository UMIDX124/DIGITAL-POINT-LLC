import { HeroSection } from '@/components/sections/HeroSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { ServicesPinReveal } from '@/components/sections/ServicesPinReveal';
import { StatStripSection } from '@/components/sections/StatStripSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { CTASection } from '@/components/sections/CTASection';
import SectionFlow from '@/components/motion/SectionFlow';

/* Phase 20.1.4 — narrative restructure with cinematic flow.
   Hero opens scene → Manifesto sets register → Services delivers →
   Stats prove → Workflow shows mechanism → Founder humanizes → CTA closes.
   SectionFlow attaches GSAP scrub-on-enter reveals to every non-hero
   section so the page no longer cuts hard between slabs. */

export default function HomePage() {
  return (
    <>
      <SectionFlow />
      <HeroSection />
      <ManifestoSection />
      <ServicesPinReveal />
      <StatStripSection />
      <WorkflowSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
