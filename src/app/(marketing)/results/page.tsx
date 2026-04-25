import type { Metadata } from 'next';
import { ResultsPage } from '@/components/sections/ResultsPage';

export const metadata: Metadata = {
  title: 'Results & Case Studies',
  description:
    'Real problems. Real fixes. Measurable outcomes. See how DPL deployed AI agents and automation that replaced operations headcount across CRM, ops, and reporting workflows.',
  openGraph: {
    title: 'Results & Case Studies — Digital Point LLC',
    description:
      'Real problems. Real fixes. Measurable outcomes across AI agent deployments, automation engineering, and operator-backed workflows.',
    url: 'https://digitalpointllc.com/results',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Results & Case Studies — Digital Point LLC',
    description: 'Real problems. Real fixes. Measurable outcomes across AI agent deployments, automation engineering, and operator-backed workflows.',
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/results',
  },
};

export default function Page() {
  return <ResultsPage />;
}
