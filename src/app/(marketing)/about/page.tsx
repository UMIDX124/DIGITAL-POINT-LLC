import { AboutPage } from '@/components/sections/AboutPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About · Digital Point LLC',
  description: 'Learn about Digital Point LLC. Eight-plus years deploying AI agents, automation, and trained operators that replace operations headcount for growth-stage companies.',
  openGraph: {
    title: 'About · Digital Point LLC',
    description: 'Learn about Digital Point LLC. Eight-plus years deploying AI agents, automation, and trained operators that replace operations headcount for growth-stage companies.',
    url: 'https://digitalpointllc.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About · Digital Point LLC',
    description: 'Learn about Digital Point LLC. Eight-plus years deploying AI agents, automation, and trained operators that replace operations headcount for growth-stage companies.',
  },
  alternates: { canonical: 'https://digitalpointllc.com/about' },
};

export default function About() {
  return <AboutPage />;
}
