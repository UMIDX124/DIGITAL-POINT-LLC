import type { Metadata } from 'next';
import { ResultsPage } from '@/components/sections/ResultsPage';
import { DesignOnlyBanner } from '@/components/integrity/DesignOnlyBanner';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Results & Case Studies',
  description:
    'Real problems. Real fixes. Measurable outcomes. See how DPL deployed AI agents and automation that replaced operations headcount across CRM, ops, and reporting workflows.',
  openGraph: {
    title: 'Results & Case Studies',
    description:
      'Real problems. Real fixes. Measurable outcomes across AI agent deployments, automation engineering, and operator-backed workflows.',
    url: 'https://www.digitalpointllc.com/results',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Results & Case Studies',
    description: 'Real problems. Real fixes. Measurable outcomes across AI agent deployments, automation engineering, and operator-backed workflows.',
  },
  alternates: {
    canonical: 'https://www.digitalpointllc.com/results',
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Results', item: 'https://www.digitalpointllc.com/results' },
        ]}
      />
      <div className="container-wide" style={{ paddingTop: 'var(--section-sm)' }}>
        <DesignOnlyBanner note="Outcome figures shown are operational composites pending fresh client-cleared attribution. Specific named-client metrics surface after NDA review only." />
      </div>
      <ResultsPage />
    </>
  );
}
