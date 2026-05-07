import type { Metadata } from 'next';
import { SystemsReportingPage } from '@/components/sections/SystemsReportingPage';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Systems & Reporting',
  description:
    'Attribution, dashboards, CRM structure, and marketing automation. The infrastructure that lets you make decisions with confidence.',
  openGraph: {
    title: 'Systems & Reporting',
    description:
      'Attribution, dashboards, CRM structure, and marketing automation for growth companies.',
    url: 'https://www.digitalpointllc.com/systems-reporting',
    type: 'website',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point Systems and Reporting. The layer that makes the work legible.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Systems & Reporting',
    description: 'Attribution, dashboards, CRM structure. The layer that makes the work legible.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.digitalpointllc.com/systems-reporting',
  },
};

export default function Page() {
  return (
    <>
      <ServiceSchema
        name="Systems & Reporting"
        description="Attribution, dashboards, CRM structure, and marketing automation infrastructure. The reporting layer that makes operator and agent work legible to leadership."
        url="https://www.digitalpointllc.com/systems-reporting"
        serviceTypes={[
          'Systems and Reporting',
          'Attribution Setup',
          'Marketing Dashboards',
          'CRM Structure',
          'Marketing Automation Infrastructure',
        ]}
      />
      <SystemsReportingPage />
    </>
  );
}
