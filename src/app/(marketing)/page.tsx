import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesPinReveal } from '@/components/sections/ServicesPinReveal';
import { StatStripSection } from '@/components/sections/StatStripSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { CTASection } from '@/components/sections/CTASection';

/* Phase 19 Path 3 trim. Premium service-agency sites (Linear, Stripe,
   innowise) ship short pages: 6 sections that each earn their place.
   Stripped from home: PullQuote (was editorial gimmick), CredentialsWall
   (band-aid; folded into FounderSection narrative), RecentWorkInline
   (band-aid; StatStrip carries proof), LogoStripSection (still env-gated
   null). Result: 6 sections that each carry one clear job. */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPinReveal />
      <StatStripSection />
      <WorkflowSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
