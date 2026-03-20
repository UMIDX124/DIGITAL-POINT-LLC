import { AboutPage } from '@/components/sections/AboutPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Digital Point LLC',
  description: 'Learn about Digital Point LLC — 8+ years helping businesses scale with performance marketing, remote workforce, and operational systems.',
};

export default function About() {
  return <AboutPage />;
}
