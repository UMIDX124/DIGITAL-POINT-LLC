import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section, Container } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { comparisons, getComparisonBySlug } from '@/lib/comparisons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  const url = `https://digitalpointllc.com/compare/${slug}`;

  return {
    title: `${comparison.metaTitle} | Digital Point LLC`,
    description: comparison.description,
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.description,
      url,
      type: 'article',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: 'Compare', href: '/compare' },
              { label: comparison.title, href: `/compare/${slug}` },
            ]}
          />

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-8 leading-tight">
            {comparison.metaTitle}
          </h1>

          <p className="text-[#b794c7] text-lg leading-relaxed">
            {comparison.intro}
          </p>
        </Container>
      </Section>

      {/* Comparison Table */}
      <Section className="py-16">
        <Container size="narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th
                    className="text-left text-xs uppercase tracking-wider text-[#7c5a8a] py-3 px-4 border-b"
                    style={{ borderColor: 'rgba(157, 78, 221, 0.2)' }}
                  >
                    Category
                  </th>
                  <th
                    className="text-left text-xs uppercase tracking-wider py-3 px-4 border-b"
                    style={{
                      borderColor: 'rgba(157, 78, 221, 0.2)',
                      color: '#c77dff',
                    }}
                  >
                    {comparison.optionA.name}
                  </th>
                  <th
                    className="text-left text-xs uppercase tracking-wider py-3 px-4 border-b"
                    style={{
                      borderColor: 'rgba(157, 78, 221, 0.2)',
                      color: '#c77dff',
                    }}
                  >
                    {comparison.optionB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparisonRows.map((row, index) => (
                  <tr key={index}>
                    <td
                      className="text-sm font-medium text-white py-3 px-4 border-b"
                      style={{ borderColor: 'rgba(157, 78, 221, 0.1)' }}
                    >
                      {row.category}
                    </td>
                    <td
                      className="text-sm text-[#b794c7] py-3 px-4 border-b"
                      style={{ borderColor: 'rgba(157, 78, 221, 0.1)' }}
                    >
                      {row.optionA}
                    </td>
                    <td
                      className="text-sm text-[#b794c7] py-3 px-4 border-b"
                      style={{ borderColor: 'rgba(157, 78, 221, 0.1)' }}
                    >
                      {row.optionB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Pros and Cons */}
      <Section className="py-16">
        <Container size="narrow">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Option A */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(26, 15, 46, 0.6)',
                border: '1px solid rgba(157, 78, 221, 0.2)',
              }}
            >
              <h3 className="font-display text-xl font-bold text-white mb-6">
                {comparison.optionA.name}
              </h3>
              <div className="mb-6">
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#c77dff' }}
                >
                  Pros
                </h4>
                <ul className="space-y-2">
                  {comparison.optionA.pros.map((pro, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#b794c7] leading-relaxed"
                    >
                      <span className="text-green-400 mt-0.5 shrink-0">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#c77dff' }}
                >
                  Cons
                </h4>
                <ul className="space-y-2">
                  {comparison.optionA.cons.map((con, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#b794c7] leading-relaxed"
                    >
                      <span className="text-red-400 mt-0.5 shrink-0">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Option B */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(26, 15, 46, 0.6)',
                border: '1px solid rgba(157, 78, 221, 0.2)',
              }}
            >
              <h3 className="font-display text-xl font-bold text-white mb-6">
                {comparison.optionB.name}
              </h3>
              <div className="mb-6">
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#c77dff' }}
                >
                  Pros
                </h4>
                <ul className="space-y-2">
                  {comparison.optionB.pros.map((pro, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#b794c7] leading-relaxed"
                    >
                      <span className="text-green-400 mt-0.5 shrink-0">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#c77dff' }}
                >
                  Cons
                </h4>
                <ul className="space-y-2">
                  {comparison.optionB.cons.map((con, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#b794c7] leading-relaxed"
                    >
                      <span className="text-red-400 mt-0.5 shrink-0">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Recommendation */}
      <Section className="py-16">
        <Container size="narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
            Our Recommendation
          </h2>
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(123, 44, 191, 0.12), rgba(157, 78, 221, 0.06))',
              border: '1px solid rgba(199, 125, 255, 0.2)',
            }}
          >
            <p className="text-[#b794c7] text-base leading-relaxed">
              {comparison.recommendation}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 pb-32">
        <Container size="narrow">
          <GrowthAuditCTA />
        </Container>
      </Section>
    </>
  );
}
