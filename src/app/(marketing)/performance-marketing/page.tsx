import type { Metadata } from 'next';
import { PerformanceMarketingPage } from '@/components/sections/PerformanceMarketingPage';

export const metadata: Metadata = {
  title: 'Performance Marketing',
  description:
    'Paid acquisition across Meta, Google, LinkedIn & TikTok. We optimize CAC, ROAS, and scale ad spend profitably with full attribution tracking.',
  openGraph: {
    title: 'Performance Marketing · Digital Point LLC',
    description:
      'Paid acquisition across Meta, Google, LinkedIn & TikTok. We optimize CAC, ROAS, and scale ad spend profitably.',
    url: 'https://digitalpointllc.com/performance-marketing',
    type: 'website',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point Performance Marketing. Paid acquisition with operator and agent execution.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Marketing · Digital Point LLC',
    description: 'Paid acquisition across Meta, Google, LinkedIn, TikTok. CAC + ROAS optimized.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/performance-marketing',
  },
};

export default function Page() {
  return <PerformanceMarketingPage />;
}
