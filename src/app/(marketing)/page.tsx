import { HeroSection } from '@/components/sections/HeroSection';
import { ProofBar } from '@/components/sections/ProofBar';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <ProcessSection />
      <PillarsSection />
      <ProofSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
