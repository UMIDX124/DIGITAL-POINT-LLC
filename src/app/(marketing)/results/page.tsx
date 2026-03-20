import type { Metadata } from 'next';
import { ResultsPage } from '@/components/sections/ResultsPage';

export const metadata: Metadata = {
  title: 'Results & Case Studies',
  description:
    'Real problems. Real fixes. Measurable outcomes. See how we helped clients achieve +127% MRR, 3.1x ROAS, and more.',
  openGraph: {
    title: 'Results & Case Studies — Digital Point LLC',
    description:
      'Real problems. Real fixes. Measurable outcomes across performance marketing, systems, and remote workforce.',
    url: 'https://digitalpointllc.com/results',
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/results',
  },
};

export default function Page() {
  return <ResultsPage />;
}
