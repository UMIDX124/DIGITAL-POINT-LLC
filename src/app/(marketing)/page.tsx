import { HeroSection } from '@/components/sections/HeroSection';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { TheMathSection } from '@/components/sections/TheMathSection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CaseStudiesPreview } from '@/components/sections/CaseStudiesPreview';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <TheMathSection />
      <PillarsSection />
      <ProcessSection />
      <CaseStudiesPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
