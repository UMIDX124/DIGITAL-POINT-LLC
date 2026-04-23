import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { copy } from '@/lib/copy';
import { caseStudies } from '@/lib/case-studies';

export function CaseStudiesPreview() {
  const { eyebrow, headline, body } = copy.caseStudies;

  return (
    <section
      className="relative section-padding"
      style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}
      id="case-studies"
    >
      <div className="container-wide">
        <header className="max-w-3xl mb-14">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] tracking-tight text-[color:var(--ivory)]">
            {headline}
          </h2>
          <p className="mt-6 text-[15px] text-[color:var(--muted)]">{body}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-case-strip>
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group card-flat p-8 flex flex-col min-h-[320px] focus-ring"
            >
              <p className="eyebrow mb-6">{study.industry}</p>
              <h3 className="font-display text-[24px] leading-tight text-[color:var(--ivory)]">
                {study.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-[color:var(--ivory-dim)]">
                {study.problem}
              </p>

              <div className="mt-auto pt-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[36px] text-[color:var(--amber)] tabular-nums">
                    {study.highlightMetric}
                  </span>
                  <span className="eyebrow">{study.highlightLabel}</span>
                </div>
              </div>

              <span className="absolute top-8 right-8 text-[color:var(--muted)] group-hover:text-[color:var(--amber)] transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
