'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, Users, Settings, FileText } from 'lucide-react';

const serviceLinks = [
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    description: 'Paid ads, ROAS optimization, and attribution tracking.',
    icon: BarChart3,
    color: '#c77dff',
  },
  {
    slug: 'remote-workforce',
    title: 'Remote Workforce',
    description: 'Dedicated remote teams that integrate with yours.',
    icon: Users,
    color: '#ff6b9d',
  },
  {
    slug: 'systems-reporting',
    title: 'Systems & Reporting',
    description: 'Dashboards, data infrastructure, and RevOps.',
    icon: Settings,
    color: '#7dd3fc',
  },
  {
    slug: 'free-growth-audit',
    title: 'Free Growth Audit',
    description: 'Find what\'s broken in your marketing stack.',
    icon: FileText,
    color: '#a3e635',
  },
];

// Auto-detect which services to link based on content keywords
const keywordMap: Record<string, string[]> = {
  'performance-marketing': ['roas', 'cac', 'paid ads', 'meta ads', 'google ads', 'attribution', 'ad spend', 'paid media', 'cpc', 'cpm', 'conversion', 'campaign'],
  'remote-workforce': ['remote team', 'workforce', 'hiring', 'outsource', 'offshore', 'team management', 'talent', 'pod structure'],
  'systems-reporting': ['dashboard', 'reporting', 'analytics', 'crm', 'hubspot', 'salesforce', 'data', 'revops', 'kpi', 'tracking'],
  'free-growth-audit': ['audit', 'growth', 'review', 'assessment', 'diagnosis', 'bottleneck'],
};

export function getRelatedServices(content: string, excludeSlug?: string): typeof serviceLinks {
  const lower = content.toLowerCase();
  const scored = serviceLinks
    .filter((s) => s.slug !== excludeSlug)
    .map((service) => {
      const keywords = keywordMap[service.slug] || [];
      const score = keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);
      return { ...service, score };
    })
    .sort((a, b) => b.score - a.score);

  // Return top 3, but always include at least audit
  const result = scored.slice(0, 3);
  const hasAudit = result.some((r) => r.slug === 'free-growth-audit');
  if (!hasAudit && excludeSlug !== 'free-growth-audit') {
    const audit = serviceLinks.find((s) => s.slug === 'free-growth-audit');
    if (audit) result[2] = { ...audit, score: 0 };
  }
  return result;
}

interface InternalLinksProps {
  title?: string;
  services?: typeof serviceLinks;
  content?: string;
  excludeSlug?: string;
  className?: string;
}

export function InternalLinks({
  title = 'Related Services',
  services,
  content,
  excludeSlug,
  className = '',
}: InternalLinksProps) {
  const links = services || (content ? getRelatedServices(content, excludeSlug) : serviceLinks.slice(0, 3));

  return (
    <div className={className}>
      <h3 className="font-display text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {links.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="group rounded-xl p-4 transition-all hover:scale-[1.01]"
              style={{
                background: 'rgba(13, 8, 21, 0.5)',
                border: '1px solid rgba(157, 78, 221, 0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: service.color }} />
                <span className="text-white text-sm font-medium group-hover:text-[#e0aaff] transition-colors">
                  {service.title}
                </span>
                <ArrowRight className="w-3 h-3 text-[#7c5a8a] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[#7c5a8a] text-xs">{service.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
