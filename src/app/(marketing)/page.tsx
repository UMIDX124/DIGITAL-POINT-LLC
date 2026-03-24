import { HeroSection } from '@/components/sections/HeroSection';
import { ProofBar } from '@/components/sections/ProofBar';
import { LatestInsights } from '@/components/sections/LatestInsights';
import { FreeResources } from '@/components/sections/FreeResources';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { CaseStudiesPreview } from '@/components/sections/CaseStudiesPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <LatestInsights />
      <FreeResources />
      <ProcessSection />
      <PillarsSection />
      <CaseStudiesPreview />
      <ProofSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
