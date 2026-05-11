import type { Metadata } from 'next';
import { getAllPosts, getAllCategories, categoryMeta } from '@/lib/blog';
import { BlogListPage } from './BlogListPage';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Field notes from running AI in production: agent stacks, automation engineering, operator workflows. What works, what breaks, and what we ship next.',
  openGraph: {
    title: 'Blog & Resources',
    description: 'Field notes from running AI in production: agent stacks, automation engineering, operator workflows. What works, what breaks, and what we ship next.',
    url: 'https://www.digitalpointllc.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Resources',
    description: 'Field notes from running AI in production: agent stacks, automation engineering, operator workflows. What works, what breaks, and what we ship next.',
  },
  alternates: { canonical: 'https://www.digitalpointllc.com/blog' },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function Blog() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: 'https://www.digitalpointllc.com' },
          { name: 'Blog', item: 'https://www.digitalpointllc.com/blog' },
        ]}
      />
      <BlogListPage posts={posts} categories={categories} categoryMeta={categoryMeta} />
    </>
  );
}
