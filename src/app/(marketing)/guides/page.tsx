import type { Metadata } from 'next';
import { getAllGuides } from '@/lib/guides';
import { GuidesHub } from './GuidesHub';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Marketing Guides & Playbooks',
  description:
    'Comprehensive marketing guides covering attribution, paid ads optimization, CAC & ROAS, analytics, remote teams, and growth systems. Actionable frameworks for growth teams.',
  alternates: { canonical: 'https://www.digitalpointllc.com/guides' },
  openGraph: {
    title: 'Marketing Guides & Playbooks',
    description:
      'In-depth guides on marketing attribution, paid ads optimization, CAC & ROAS, analytics, remote teams, and growth systems.',
    url: 'https://www.digitalpointllc.com/guides',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Guides & Playbooks',
    description: 'In-depth guides on marketing attribution, paid ads optimization, CAC & ROAS, analytics, remote teams, and growth systems.',
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: 'https://www.digitalpointllc.com' },
          { name: 'Guides', item: 'https://www.digitalpointllc.com/guides' },
        ]}
      />
      <GuidesHub guides={guides} />
    </>
  );
}
