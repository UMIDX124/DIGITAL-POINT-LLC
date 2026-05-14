import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
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

  const hasIndexable = getAllPosts().some(
    (p) => p.category === categoryName && p.indexable === true
  );

  const url = `https://digitalpointllc.com/blog/category/${slug}`;
  const title = `${categoryName} articles | DPL Blog`;

  return {
    title,
    description: meta.description,
    alternates: { canonical: url },
    robots: hasIndexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      title,
      description: meta.description,
      url,
      siteName: 'Digital Point LLC',
      type: 'website',
      locale: 'en_US',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const categoryName = slugToCategory[slug];
  if (!categoryName) notFound();

  const posts = getAllPosts().filter((p) => p.category === categoryName);
  const meta = categoryMeta[categoryName];
  const url = `https://digitalpointllc.com/blog/category/${slug}`;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} articles`,
    description: meta.description,
    url,
    hasPart: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `https://digitalpointllc.com/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <BlogCategoryContent categoryName={categoryName} meta={meta} posts={posts} />
    </>
  );
}
