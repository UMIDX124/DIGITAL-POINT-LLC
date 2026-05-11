import type { MetadataRoute } from 'next';
import { getAllPosts, categoryMeta } from '@/lib/blog';
import { comparisons } from '@/lib/comparisons';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.digitalpointllc.com';

  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  ];

  // Core service pages — new positioning (priority 1.0 for Recovery as lead)
  const servicePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/recovery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/agents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/automation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/operators`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/process`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/stack`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/audit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/diagnostic`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  ];
  // Legacy pillar URLs are 301-redirected via next.config.ts to /automation,
  // /operators, /agents. Excluded from sitemap so search engines only see
  // the canonical destinations.

  // Other core pages (blog excluded — currently noindex, legacy content)
  const corePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/results`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Research pages
  const researchPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/research/facebook-ads-benchmarks-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/google-ads-roas-benchmarks`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/average-cac-by-industry`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/marketing-attribution-statistics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/remote-workforce-cost-analysis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Tools pages
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/roas-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/cac-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/ad-spend-profit-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/attribution-model-visualizer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/dashboard-cost-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Blog: only indexable posts (new positioning cluster) ship in the
  // sitemap. Legacy paid-media posts remain noindex and out of sitemap.
  const indexablePosts = getAllPosts().filter((p) => p.indexable === true);
  const blogPages: MetadataRoute.Sitemap =
    indexablePosts.length > 0
      ? [
          { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
          ...indexablePosts.map((p) => ({
            url: `${baseUrl}/blog/${p.slug}`,
            lastModified: p.lastModified ? new Date(p.lastModified) : new Date(p.date),
            changeFrequency: 'monthly' as const,
            priority: 0.75,
          })),
        ]
      : [];
  const indexableCategories = Array.from(
    new Set(indexablePosts.map((p) => p.category))
  );
  const blogCategoryPages: MetadataRoute.Sitemap = indexableCategories
    .map((c) => categoryMeta[c])
    .filter(Boolean)
    .map((meta) => ({
      url: `${baseUrl}/blog/category/${meta.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }));

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...homepage,
    ...servicePages,
    ...corePages,
    ...researchPages,
    ...toolPages,
    ...blogPages,
    ...blogCategoryPages,
    ...comparisonPages,
    ...legalPages,
  ];
}
