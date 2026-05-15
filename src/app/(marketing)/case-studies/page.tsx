import type { Metadata } from 'next';
import { CaseStudiesPage } from './CaseStudiesPage';
import { DesignOnlyBanner } from '@/components/integrity/DesignOnlyBanner';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'See how Digital Point LLC deploys AI agent stacks that replace operations headcount. Agents handle 80%+ of repeatable work, operators audit exceptions.',
  openGraph: {
    title: 'Case Studies',
    description:
      'Real results from real clients. See how AI agents + automation + operator backstop replaced ops headcount and ran the workflows unattended.',
    url: 'https://www.digitalpointllc.com/case-studies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies',
    description: 'Real results from real clients. See how AI agents + automation + operator backstop replaced ops headcount and ran the workflows unattended.',
  },
  alternates: { canonical: 'https://www.digitalpointllc.com/case-studies' },
};

export default function CaseStudies() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Case Studies', item: 'https://www.digitalpointllc.com/case-studies' },
        ]}
      />
      <div className="container-wide" style={{ paddingTop: 'var(--section-sm)' }}>
        <DesignOnlyBanner note="Case-study outcomes are anonymized composites pending fresh client signoff. Numbers reflect representative engagement shape, not a specific named client until cleared." />
      </div>
      <CaseStudiesPage />
    </>
  );
}
