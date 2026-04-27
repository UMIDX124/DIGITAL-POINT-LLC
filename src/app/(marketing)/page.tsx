import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesPinReveal } from '@/components/sections/ServicesPinReveal';
import { LogoStripSection } from '@/components/sections/LogoStripSection';
import { StatStripSection } from '@/components/sections/StatStripSection';
import { PullQuoteSection } from '@/components/sections/PullQuoteSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { CTASection } from '@/components/sections/CTASection';

/* Phase 17b 3-reversal — Bloomberg Operator restraint pass.
   Removed from home: ComparisonTable (R1, deleted), FAQSection (R2,
   moved to /faq), RecentWorkSection chart+cards (R3, replaced by
   compact StatStripSection — instrument-panel telemetry, not case-study
   marketing). Phase 13 TestimonialsSection.tsx returns null preserved. */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPinReveal />
      <StatStripSection />
      <LogoStripSection />
      <PullQuoteSection />
      <WorkflowSection />
      <CTASection />
    </>
  );
}
