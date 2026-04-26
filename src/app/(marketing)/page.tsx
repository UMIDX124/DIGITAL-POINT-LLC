import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesPinReveal } from '@/components/sections/ServicesPinReveal';
import { LogoStripSection } from '@/components/sections/LogoStripSection';
import { RecentWorkSection } from '@/components/sections/RecentWorkSection';
import { PullQuoteSection } from '@/components/sections/PullQuoteSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { CTASection } from '@/components/sections/CTASection';

/* Phase 13 — TestimonialsSection removed. Brand integrity: DPL has clients
   but no published testimonials yet (newly onboarded). The fabricated
   Sarah/Marcus/Jennifer quotes from Phase 2 came down with this commit.
   The component file is preserved for Phase 14 re-enable when real
   testimonials land. */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPinReveal />
      <LogoStripSection />
      <RecentWorkSection />
      <PullQuoteSection />
      <WorkflowSection />
      <CTASection />
    </>
  );
}
