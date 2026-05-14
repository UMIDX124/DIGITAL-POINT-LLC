import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

  const url = `https://digitalpointllc.com/guides/${slug}`;

  return {
    title: `${guide.title} | Digital Point LLC`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: 'article',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return <GuideContent guide={guide} />;
}
