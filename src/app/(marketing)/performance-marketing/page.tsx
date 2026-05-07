import type { Metadata } from 'next';
import { PerformanceMarketingPage } from '@/components/sections/PerformanceMarketingPage';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Performance Marketing',
  description:
    'Paid acquisition across Meta, Google, LinkedIn & TikTok. We optimize CAC, ROAS, and scale ad spend profitably with full attribution tracking.',
  openGraph: {
    title: 'Performance Marketing',
    description:
      'Paid acquisition across Meta, Google, LinkedIn & TikTok. We optimize CAC, ROAS, and scale ad spend profitably.',
    url: 'https://www.digitalpointllc.com/performance-marketing',
    type: 'website',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point Performance Marketing. Paid acquisition with operator and agent execution.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Marketing',
    description: 'Paid acquisition across Meta, Google, LinkedIn, TikTok. CAC + ROAS optimized.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.digitalpointllc.com/performance-marketing',
  },
};

export default function Page() {
  return (
    <>
      <ServiceSchema
        name="Performance Marketing"
        description="Paid acquisition across Meta, Google, LinkedIn, and TikTok with operator and agent execution. CAC and ROAS optimization plus full attribution tracking, run as a managed service."
        url="https://www.digitalpointllc.com/performance-marketing"
        serviceTypes={[
          'Performance Marketing',
          'Paid Acquisition',
          'Meta Ads Management',
          'Google Ads Management',
          'LinkedIn Ads Management',
          'TikTok Ads Management',
          'CAC Optimization',
          'ROAS Optimization',
          'Attribution Tracking',
        ]}
      />
      <PerformanceMarketingPage />
    </>
  );
}
