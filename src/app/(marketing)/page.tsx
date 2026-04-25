import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesListSection } from '@/components/sections/ServicesListSection';
import { LogoStripSection } from '@/components/sections/LogoStripSection';
import { RecentWorkSection } from '@/components/sections/RecentWorkSection';
import { PullQuoteSection } from '@/components/sections/PullQuoteSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesListSection />
      <LogoStripSection />
      <RecentWorkSection />
      <PullQuoteSection />
      <WorkflowSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
