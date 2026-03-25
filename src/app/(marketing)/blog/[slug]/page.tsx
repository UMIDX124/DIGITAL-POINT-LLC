import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug, generateTOC, markdownToHtml, categoryMeta } from '@/lib/blog';
import { ArticleSchema } from '@/components/seo/FAQSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BlogPostContent } from './BlogPostContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const baseUrl = 'https://digitalpointllc.com';
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${baseUrl}/blog/${slug}`,
      ...(post.image && {
        images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = generateTOC(post.content);
  const htmlContent = markdownToHtml(post.content);
  const baseUrl = 'https://digitalpointllc.com';
  const catMeta = categoryMeta[post.category] || { color: '#c77dff', slug: post.category.toLowerCase().replace(/\s+/g, '-'), description: post.category };

  // Get related posts (same category, excluding current)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Schema markup */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.lastModified}
        author={post.author}
        url={`${baseUrl}/blog/${slug}`}
        image={post.image}
      />
      {post.faqs && post.faqs.length > 0 && <FAQSchema faqs={post.faqs} />}

      <BlogPostContent
        post={post}
        toc={toc}
        htmlContent={htmlContent}
        catMeta={catMeta}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
