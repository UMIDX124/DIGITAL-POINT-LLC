import { HeroSection } from '@/components/sections/HeroSection';
import { ActivityTicker } from '@/components/marketing/ActivityTicker';
import { HomeEvidence } from '@/components/sections/HomeEvidence';
import { AgencyMailboxPositioning } from '@/components/sections/AgencyMailboxPositioning';
import { RecoverySection } from '@/components/sections/RecoverySection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { HomeSystemFlow } from '@/components/sections/HomeSystemFlow';
import { MathSection } from '@/components/sections/MathSection';
import { FoundersSection } from '@/components/sections/FoundersSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { StackSection } from '@/components/sections/StackSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ActivityTicker />
      <HomeEvidence />
      <AgencyMailboxPositioning />
      <RecoverySection />
      <PillarsSection />
      <HomeSystemFlow />
      <MathSection />
      <FoundersSection variant="compact" />
      <ProcessSection />
      <StackSection />
      <CTASection />
    </>
  );
}
