import type { Metadata } from 'next';
import { getAllPosts, getAllCategories, categoryMeta } from '@/lib/blog';
import { BlogListPage } from './BlogListPage';

export const metadata: Metadata = {
  title: 'Blog & Resources — Digital Point LLC',
  description: 'Field notes from running AI in production: agent stacks, automation engineering, operator workflows. What works, what breaks, and what we ship next.',
  openGraph: {
    title: 'Blog & Resources — Digital Point LLC',
    description: 'Field notes from running AI in production: agent stacks, automation engineering, operator workflows. What works, what breaks, and what we ship next.',
    url: 'https://digitalpointllc.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Resources — Digital Point LLC',
    description: 'Field notes from running AI in production: agent stacks, automation engineering, operator workflows. What works, what breaks, and what we ship next.',
  },
  alternates: { canonical: 'https://digitalpointllc.com/blog' },
};

export default function Blog() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return <BlogListPage posts={posts} categories={categories} categoryMeta={categoryMeta} />;
}
