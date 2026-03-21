import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, categoryMeta, type BlogCategory } from '@/lib/blog';
import { BlogCategoryContent } from './BlogCategoryContent';

interface PageProps {
  params: Promise<{ category: string }>;
}

const slugToCategory: Record<string, BlogCategory> = Object.fromEntries(
  Object.entries(categoryMeta).map(([name, meta]) => [meta.slug, name as BlogCategory])
);

export function generateStaticParams() {
  return Object.values(categoryMeta).map((meta) => ({ category: meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categoryName = slugToCategory[slug];
  if (!categoryName) return {};
  const meta = categoryMeta[categoryName];

  return {
    title: `${categoryName} Articles`,
    description: meta.description,
    alternates: { canonical: `https://digitalpointllc.com/blog/category/${slug}` },
    openGraph: {
      title: `${categoryName} — Digital Point LLC Blog`,
      description: meta.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const categoryName = slugToCategory[slug];
  if (!categoryName) notFound();

  const posts = getAllPosts().filter((p) => p.category === categoryName);
  const meta = categoryMeta[categoryName];

  return <BlogCategoryContent categoryName={categoryName} meta={meta} posts={posts} />;
}
