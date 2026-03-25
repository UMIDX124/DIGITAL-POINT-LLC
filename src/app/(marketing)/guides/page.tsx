import type { Metadata } from 'next';
import { getAllGuides } from '@/lib/guides';
import { GuidesHub } from './GuidesHub';

export const metadata: Metadata = {
  title: 'Marketing Guides & Playbooks',
  description:
    'Comprehensive marketing guides covering attribution, paid ads optimization, CAC & ROAS, analytics, remote teams, and growth systems. Actionable frameworks for growth teams.',
  alternates: { canonical: 'https://digitalpointllc.com/guides' },
  openGraph: {
    title: 'Marketing Guides & Playbooks — Digital Point LLC',
    description:
      'In-depth guides on marketing attribution, paid ads optimization, CAC & ROAS, analytics, remote teams, and growth systems.',
    url: 'https://digitalpointllc.com/guides',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Guides & Playbooks — Digital Point LLC',
    description: 'In-depth guides on marketing attribution, paid ads optimization, CAC & ROAS, analytics, remote teams, and growth systems.',
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();
  return <GuidesHub guides={guides} />;
}
