import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomeEvidence } from '@/components/sections/HomeEvidence';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { HomeSystemFlow } from '@/components/sections/HomeSystemFlow';
import { FoundersSection } from '@/components/sections/FoundersSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { RecoverySection } from '@/components/sections/RecoverySection';
import { PricingBand } from '@/components/sections/PricingBand';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: { absolute: 'AI Agents That Run Your Ops · Digital Point LLC' },
  description:
    'Replace a four-person ops team with AI agents and one human operator. $30K a year instead of $400K. Audit free, written deployment plan within five business days.',
  alternates: { canonical: 'https://www.digitalpointllc.com' },
  openGraph: {
    title: 'AI Agents That Run Your Ops · Digital Point LLC',
    description:
      'Replace a four-person ops team with AI agents and one human operator. $30K a year instead of $400K.',
    url: 'https://www.digitalpointllc.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agents That Run Your Ops · Digital Point LLC',
    description:
      'Four-person ops for $30K a year. Agents plus one human operator. Audit free.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeEvidence />
      <PillarsSection />
      <HomeSystemFlow />
      <ProcessSection />
      <FoundersSection variant="compact" />
      <RecoverySection />
      <PricingBand />
      <CTASection />
    </>
  );
}
