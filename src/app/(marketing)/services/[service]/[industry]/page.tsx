import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import {
  services,
  industries,
  getServiceIndustryContent,
} from '@/lib/programmatic-seo';

interface PageProps {
  params: Promise<{ service: string; industry: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; industry: string }[] = [];
  for (const service of services) {
    for (const industry of industries) {
      params.push({ service: service.slug, industry: industry.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, industry } = await params;
  const content = getServiceIndustryContent(service, industry);
  if (!content) return {};

  const title = `${content.service.name} for ${content.industry.name} | Digital Point LLC`;
  const description = `Vertical page for ${content.service.name.toLowerCase()} in ${content.industry.name.toLowerCase()}. Curated short-list of priority verticals in progress; this URL is currently a placeholder.`;
  const url = `https://www.digitalpointllc.com/services/${service}/${industry}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
}

export default async function ServiceIndustryPage({ params }: PageProps) {
  const { service, industry } = await params;
  const content = getServiceIndustryContent(service, industry);
  if (!content) notFound();

  return (
    <Section className="pt-32 pb-32">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: content.service.name, href: `/services/${service}` },
            { label: content.industry.name, href: `/services/${service}/${industry}` },
          ]}
        />

        <p
          className="font-mono uppercase mt-6 mb-4"
          style={{ fontSize: '12px', letterSpacing: '0.18em', color: 'var(--text-tertiary)' }}
        >
          PLACEHOLDER · CURATED VERTICALS IN PROGRESS
        </p>

        <h1
          className="font-display"
          style={{
            fontSize: 'var(--text-h1)',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 'var(--maxw-heading-display)',
          }}
        >
          {content.service.name} for {content.industry.name}.
        </h1>

        <div
          className="mt-8 space-y-5 text-[16px] leading-[1.65]"
          style={{ color: 'var(--text-secondary)', maxWidth: 'var(--maxw-body)' }}
        >
          <p>
            This is a placeholder. Digital Point is tightening its programmatic
            footprint to a curated short list of five priority verticals across
            five service pillars, hand-written by the operators who run the
            engagements. Generic per-vertical pages do not represent the work.
          </p>
          <p>
            The curated 25-page set ships as part of Phase 20 polish. Until then,
            this URL is set to <code>noindex,nofollow</code> and is excluded
            from the sitemap so search engines do not surface generic content
            on Digital Point&apos;s behalf.
          </p>
          <p>
            For the actual service surfaces, follow the links below.
          </p>
        </div>

        <ul
          role="list"
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-0"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {[
            { href: `/automation`, label: content.service.name, body: 'The canonical service page. What we actually run, how it is built, and the current pricing.' },
            { href: '/case-studies', label: 'Case studies', body: 'Anonymized engagements with real operator-hours and pipeline numbers attached.' },
            { href: '/free-growth-audit', label: 'Free audit', body: 'Five-day written deployment plan. A co-founder reviews your stack personally.' },
            { href: '/contact', label: 'Talk to us', body: 'One accountable surface. No generic queue.' },
          ].map((link) => (
            <li
              key={link.href}
              className="group"
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                borderRight: '1px solid var(--border-subtle)',
              }}
            >
              <Link
                href={link.href}
                className="flex flex-col h-full p-6 focus-ring transition-colors hover:bg-[var(--bg-secondary)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="font-display"
                    style={{
                      fontSize: '17px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {link.label}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'var(--accent-primary)' }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.55]" style={{ color: 'var(--text-secondary)' }}>
                  {link.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
