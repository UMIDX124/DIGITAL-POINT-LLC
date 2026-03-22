import Link from 'next/link';
import { getAllPosts, categoryMeta, type BlogCategory } from '@/lib/blog';

interface EnhancedInternalLinksProps {
  currentPath: string;
  category?: string;
}

const toolLinks = [
  { slug: 'roas-calculator', title: 'ROAS Calculator', description: 'Calculate your return on ad spend instantly.' },
  { slug: 'cac-calculator', title: 'CAC Calculator', description: 'Measure customer acquisition cost by channel.' },
  { slug: 'ad-spend-profit-calculator', title: 'Ad Spend Profit Calculator', description: 'See how much profit your ad campaigns generate.' },
  { slug: 'attribution-model-visualizer', title: 'Attribution Model Visualizer', description: 'Compare attribution models side by side.' },
  { slug: 'dashboard-cost-calculator', title: 'Dashboard Cost Calculator', description: 'Estimate the cost of your reporting stack.' },
];

const researchLinks = [
  { slug: 'facebook-ads-benchmarks-2026', title: 'Facebook Ads Benchmarks 2026', description: 'Latest CPM, CPC, and ROAS benchmarks for Meta Ads.' },
  { slug: 'google-ads-roas-benchmarks', title: 'Google Ads ROAS Benchmarks', description: 'Industry ROAS benchmarks for Google Ads campaigns.' },
  { slug: 'average-cac-by-industry', title: 'Average CAC by Industry', description: 'Customer acquisition cost benchmarks across verticals.' },
  { slug: 'marketing-attribution-statistics', title: 'Marketing Attribution Statistics', description: 'Data on how attribution impacts marketing ROI.' },
  { slug: 'remote-workforce-cost-analysis', title: 'Remote Workforce Cost Analysis', description: 'Cost savings data for remote marketing teams.' },
];

const comparisonLinks = [
  { slug: 'digital-point-vs-wpromote', title: 'Digital Point vs Wpromote' },
  { slug: 'digital-point-vs-tinuiti', title: 'Digital Point vs Tinuiti' },
  { slug: 'digital-point-vs-merkle', title: 'Digital Point vs Merkle' },
  { slug: 'digital-point-vs-power-digital', title: 'Digital Point vs Power Digital' },
  { slug: 'digital-point-vs-directive', title: 'Digital Point vs Directive' },
  { slug: 'digital-point-vs-webfx', title: 'Digital Point vs WebFX' },
];

function getRelatedBlogPosts(currentPath: string, category?: string, count: number = 3) {
  const posts = getAllPosts();
  const currentSlug = currentPath.replace('/blog/', '').replace(/^\//, '');

  if (category) {
    const catKey = Object.keys(categoryMeta).find(
      (key) => categoryMeta[key as BlogCategory].slug === category || key === category
    ) as BlogCategory | undefined;

    if (catKey) {
      const sameCat = posts.filter((p) => p.category === catKey && p.slug !== currentSlug);
      if (sameCat.length >= count) return sameCat.slice(0, count);
      const others = posts.filter((p) => p.category !== catKey && p.slug !== currentSlug);
      return [...sameCat, ...others].slice(0, count);
    }
  }

  return posts.filter((p) => p.slug !== currentSlug).slice(0, count);
}

function pickItems<T extends { slug: string }>(items: T[], count: number, excludeSlugs: string[] = []): T[] {
  const filtered = items.filter((item) => !excludeSlugs.some((ex) => ex.includes(item.slug)));
  const offset = excludeSlugs.join('').length % Math.max(filtered.length, 1);
  const shifted = [...filtered.slice(offset), ...filtered.slice(0, offset)];
  return shifted.slice(0, count);
}

export function EnhancedInternalLinks({ currentPath, category }: EnhancedInternalLinksProps) {
  const relatedPosts = getRelatedBlogPosts(currentPath, category, 3);
  const selectedTools = pickItems(toolLinks, 2, [currentPath]);
  const selectedResearch = pickItems(researchLinks, 1, [currentPath]);
  const selectedComparison = pickItems(comparisonLinks, 1, [currentPath]);

  return (
    <nav
      aria-label="Related content"
      className="mt-12 rounded-2xl p-6 sm:p-8"
      style={{
        background: 'rgba(13, 8, 21, 0.6)',
        border: '1px solid rgba(157, 78, 221, 0.15)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <h2 className="font-display text-xl font-semibold text-white mb-6">
        Continue Reading
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-[#7c5a8a] mb-3">
              Related Articles
            </h3>
            <ul className="space-y-2">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-2 text-[#b794c7] hover:text-[#c77dff] transition-colors"
                  >
                    <span
                      className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: '#c77dff' }}
                    />
                    <span className="text-sm leading-snug group-hover:underline">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Tools */}
        {selectedTools.length > 0 && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-[#7c5a8a] mb-3">
              Free Tools
            </h3>
            <ul className="space-y-2">
              {selectedTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="group flex items-start gap-2 text-[#b794c7] hover:text-[#c77dff] transition-colors"
                  >
                    <span
                      className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: '#a3e635' }}
                    />
                    <span className="text-sm leading-snug">
                      <span className="group-hover:underline">{tool.title}</span>
                      <span className="block text-xs text-[#7c5a8a] mt-0.5">
                        {tool.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Research */}
        {selectedResearch.length > 0 && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-[#7c5a8a] mb-3">
              Research
            </h3>
            <ul className="space-y-2">
              {selectedResearch.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/research/${item.slug}`}
                    className="group flex items-start gap-2 text-[#b794c7] hover:text-[#c77dff] transition-colors"
                  >
                    <span
                      className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: '#7dd3fc' }}
                    />
                    <span className="text-sm leading-snug">
                      <span className="group-hover:underline">{item.title}</span>
                      <span className="block text-xs text-[#7c5a8a] mt-0.5">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Comparison */}
        {selectedComparison.length > 0 && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-[#7c5a8a] mb-3">
              Comparisons
            </h3>
            <ul className="space-y-2">
              {selectedComparison.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/compare/${item.slug}`}
                    className="group flex items-start gap-2 text-[#b794c7] hover:text-[#c77dff] transition-colors"
                  >
                    <span
                      className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: '#ff6b9d' }}
                    />
                    <span className="text-sm leading-snug group-hover:underline">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
