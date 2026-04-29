import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesPinReveal } from '@/components/sections/ServicesPinReveal';
import { LogoStripSection } from '@/components/sections/LogoStripSection';
import { StatStripSection } from '@/components/sections/StatStripSection';
import { PullQuoteSection } from '@/components/sections/PullQuoteSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { CTASection } from '@/components/sections/CTASection';
import { CredentialsWall } from '@/components/sections/CredentialsWall';
import { RecentWorkInline } from '@/components/sections/RecentWorkInline';
import { FounderSection } from '@/components/sections/FounderSection';

/* Phase 19 Path 3 — homepage composition. Adds RecentWorkInline,
   CredentialsWall, FounderSection to give the page real-feeling
   substance without breaking integrity rules. LogoStripSection still
   ships (env-gated null until real logos land). */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPinReveal />
      <StatStripSection />
      <RecentWorkInline />
      <WorkflowSection />
      <PullQuoteSection />
      <CredentialsWall />
      <FounderSection />
      <LogoStripSection />
      <CTASection />
    </>
  );
}
