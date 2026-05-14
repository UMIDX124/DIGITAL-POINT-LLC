import type { MetadataRoute } from 'next';
import { getAllPosts, categoryMeta } from '@/lib/blog';
import { getAllGuides } from '@/lib/guides';
import { comparisons } from '@/lib/comparisons';

const STATIC_LAST_MOD = new Date('2026-05-14');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://digitalpointllc.com';

  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: STATIC_LAST_MOD, changeFrequency: 'weekly', priority: 1.0 },
  ];

  // Core service pages. New positioning (priority 1.0 for Recovery as lead)
  const servicePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/recovery`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/agents`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/automation`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/operators`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/process`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/stack`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/audit`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/diagnostic`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.85 },
  ];
  // Legacy pillar URLs are 301-redirected via next.config.ts to /automation,
  // /operators, /agents. Excluded from sitemap so search engines only see
  // the canonical destinations.

  // Other core pages (blog excluded. Currently noindex, legacy content)
  const corePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/results`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Research pages
  const researchPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/research`, lastModified: STATIC_LAST_MOD, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/research/facebook-ads-benchmarks-2026`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/google-ads-roas-benchmarks`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/average-cac-by-industry`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/marketing-attribution-statistics`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/remote-workforce-cost-analysis`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Tools pages
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/tools`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/roas-calculator`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/cac-calculator`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/ad-spend-profit-calculator`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/attribution-model-visualizer`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/dashboard-cost-calculator`, lastModified: STATIC_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Blog: only indexable posts (new positioning cluster) ship in the
  // sitemap. Legacy paid-media posts remain noindex and out of sitemap.
  const indexablePosts = getAllPosts().filter((p) => p.indexable === true);
  const blogPages: MetadataRoute.Sitemap =
    indexablePosts.length > 0
      ? [
          { url: `${baseUrl}/blog`, lastModified: STATIC_LAST_MOD, changeFrequency: 'weekly' as const, priority: 0.8 },
          ...indexablePosts.map((p) => ({
            url: `${baseUrl}/blog/${p.slug}`,
            lastModified: p.lastModified
              ? new Date(p.lastModified)
              : p.date
                ? new Date(p.date)
                : STATIC_LAST_MOD,
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
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }));

  // Guides
  const guides = getAllGuides();
  const guidePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: STATIC_LAST_MOD, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...guides.map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: g.dateModified
        ? new Date(g.dateModified)
        : g.datePublished
          ? new Date(g.datePublished)
          : STATIC_LAST_MOD,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy-policy`, lastModified: STATIC_LAST_MOD, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: STATIC_LAST_MOD, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: STATIC_LAST_MOD, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...homepage,
    ...servicePages,
    ...corePages,
    ...researchPages,
    ...toolPages,
    ...blogPages,
    ...blogCategoryPages,
    ...guidePages,
    ...comparisonPages,
    ...legalPages,
  ];
}
