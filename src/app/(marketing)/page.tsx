import { HeroSection } from '@/components/sections/HeroSection';
import { RecoverySection } from '@/components/sections/RecoverySection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { MathSection } from '@/components/sections/MathSection';
import { FoundersSection } from '@/components/sections/FoundersSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { StackSection } from '@/components/sections/StackSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RecoverySection />
      <PillarsSection />
      <MathSection />
      <FoundersSection variant="compact" />
      <ProcessSection />
      <StackSection />
      <CTASection />
    </>
  );
}
