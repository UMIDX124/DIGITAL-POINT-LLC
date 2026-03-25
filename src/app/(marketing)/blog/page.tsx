import type { Metadata } from 'next';
import { getAllPosts, getAllCategories, categoryMeta } from '@/lib/blog';
import { BlogListPage } from './BlogListPage';

export const metadata: Metadata = {
  title: 'Blog & Resources — Digital Point LLC',
  description: 'Growth marketing insights, remote workforce playbooks, paid ads benchmarks, and operational frameworks from Digital Point LLC.',
  openGraph: {
    title: 'Blog & Resources — Digital Point LLC',
    description: 'Growth marketing insights, remote workforce playbooks, paid ads benchmarks, and operational frameworks from Digital Point LLC.',
    url: 'https://digitalpointllc.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Resources — Digital Point LLC',
    description: 'Growth marketing insights, remote workforce playbooks, paid ads benchmarks, and operational frameworks from Digital Point LLC.',
  },
  alternates: { canonical: 'https://digitalpointllc.com/blog' },
};

export default function Blog() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return <BlogListPage posts={posts} categories={categories} categoryMeta={categoryMeta} />;
}
