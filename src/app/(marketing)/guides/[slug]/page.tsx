import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import { GuideContent } from './GuideContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const url = `https://www.digitalpointllc.com/guides/${slug}`;

  return {
    title: `${guide.title} | Digital Point LLC`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      siteName: 'Digital Point LLC',
      type: 'article',
      locale: 'en_US',
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: ['Digital Point LLC'],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const url = `https://www.digitalpointllc.com/guides/${slug}`;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: {
      '@type': 'Organization',
      name: 'Digital Point LLC',
      url: 'https://www.digitalpointllc.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Point LLC',
      url: 'https://www.digitalpointllc.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.digitalpointllc.com/dp-mark-light.png',
      },
    },
    image: 'https://www.digitalpointllc.com/og-image.png',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <GuideContent guide={guide} />
    </>
  );
}
