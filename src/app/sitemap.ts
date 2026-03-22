import type { MetadataRoute } from 'next';
import { getAllPosts, categoryMeta } from '@/lib/blog';
import { services, industries, cities } from '@/lib/programmatic-seo';
import { comparisons } from '@/lib/comparisons';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://digitalpointllc.com';

  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  ];

  // Core service pages
  const servicePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/performance-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/remote-workforce`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/systems-reporting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/free-growth-audit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  // Other core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/results`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
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

  // Blog categories
  const categoryPages: MetadataRoute.Sitemap = Object.values(categoryMeta).map((meta) => ({
    url: `${baseUrl}/blog/category/${meta.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog posts
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified ? new Date(post.lastModified) : new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Programmatic SEO: /services/[service]/[industry]
  const serviceIndustryPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    industries.map((industry) => ({
      url: `${baseUrl}/services/${service.slug}/${industry.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  // Programmatic SEO: /services/[service]/near/[city]
  const serviceCityPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    cities.map((city) => ({
      url: `${baseUrl}/services/${service.slug}/near/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

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
  ];

  return [
    ...homepage,
    ...servicePages,
    ...corePages,
    ...researchPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
    ...serviceIndustryPages,
    ...serviceCityPages,
    ...comparisonPages,
    ...legalPages,
  ];
}
