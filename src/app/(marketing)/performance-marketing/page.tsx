import type { Metadata } from 'next';
import { PerformanceMarketingPage } from '@/components/sections/PerformanceMarketingPage';

export const metadata: Metadata = {
  title: 'Performance Marketing',
  description:
    'Paid acquisition across Meta, Google, LinkedIn & TikTok. We optimize CAC, ROAS, and scale ad spend profitably with full attribution tracking.',
  openGraph: {
    title: 'Performance Marketing — Digital Point LLC',
    description:
      'Paid acquisition across Meta, Google, LinkedIn & TikTok. We optimize CAC, ROAS, and scale ad spend profitably.',
    url: 'https://digitalpointllc.com/performance-marketing',
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/performance-marketing',
  },
};

export default function Page() {
  return <PerformanceMarketingPage />;
}
