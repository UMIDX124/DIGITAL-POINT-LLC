import type { Metadata } from 'next';
import { CaseStudiesPage } from './CaseStudiesPage';

export const metadata: Metadata = {
  title: 'Case Studies · Digital Point LLC',
  description:
    'See how Digital Point LLC deploys AI agent stacks that replace operations headcount. Agents handle 80%+ of repeatable work, operators audit exceptions.',
  openGraph: {
    title: 'Case Studies · Digital Point LLC',
    description:
      'Real results from real clients. See how AI agents + automation + operator backstop replaced ops headcount and ran the workflows unattended.',
    url: 'https://digitalpointllc.com/case-studies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies · Digital Point LLC',
    description: 'Real results from real clients. See how AI agents + automation + operator backstop replaced ops headcount and ran the workflows unattended.',
  },
  alternates: { canonical: 'https://digitalpointllc.com/case-studies' },
};

export default function CaseStudies() {
  return <CaseStudiesPage />;
}
