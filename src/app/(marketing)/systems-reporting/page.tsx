import type { Metadata } from 'next';
import { SystemsReportingPage } from '@/components/sections/SystemsReportingPage';

export const metadata: Metadata = {
  title: 'Systems & Reporting',
  description:
    'Attribution, dashboards, CRM structure, and marketing automation. The infrastructure that lets you make decisions with confidence.',
  openGraph: {
    title: 'Systems & Reporting — Digital Point LLC',
    description:
      'Attribution, dashboards, CRM structure, and marketing automation for growth companies.',
    url: 'https://digitalpointllc.com/systems-reporting',
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/systems-reporting',
  },
};

export default function Page() {
  return <SystemsReportingPage />;
}
