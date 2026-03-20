import { BlogPage } from '@/components/sections/BlogPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Resources — Digital Point LLC',
  description: 'Growth marketing insights, remote workforce playbooks, and operational frameworks from Digital Point LLC.',
};

export default function Blog() {
  return <BlogPage />;
}
