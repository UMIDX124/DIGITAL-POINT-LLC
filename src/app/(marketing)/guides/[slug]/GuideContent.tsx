'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Clock, ChevronRight, Lightbulb, ExternalLink } from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard,
} from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import type { Guide } from '@/lib/guides';

function TableOfContents({ sections, activeId }: { sections: { id: string; title: string }[]; activeId: string }) {
  return (
    <nav className="space-y-1" aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#9080a0] mb-3">
        Table of Contents
      </p>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${
            activeId === section.id
              ? 'text-white bg-[rgba(199,125,255,0.12)] border-l-2 border-[#c77dff]'
              : 'text-[#9080a0] hover:text-[#b794c7] hover:bg-[rgba(199,125,255,0.06)]'
          }`}
        >
          {section.title}
        </a>
      ))}
    </nav>
  );
}

function KeyTakeaway({ text }: { text: string }) {
  return (
    <div
      className="my-8 rounded-xl p-5"
      style={{
        borderLeft: '3px solid #c77dff',
        background: 'linear-gradient(135deg, rgba(199, 125, 255, 0.08), rgba(157, 78, 221, 0.03))',
      }}
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-[#c77dff] shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#c77dff] mb-1.5">
            Key Takeaway
          </p>
          <p className="text-[#b794c7] text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

function RelatedLinks({ links }: { links: Guide['relatedLinks'] }) {
  const typeLabels: Record<string, string> = {
    tool: 'Tool',
    research: 'Research',
    blog: 'Guide',
  };
  const typeColors: Record<string, string> = {
    tool: '#a3e635',
    research: '#7dd3fc',
    blog: '#c77dff',
  };

  return (
    <div className="my-10">
      <h3 className="text-white font-display text-lg font-semibold mb-4">Related Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 p-3 rounded-xl group transition-all duration-200 hover:bg-[rgba(199,125,255,0.06)]"
            style={{
              border: '1px solid rgba(157, 78, 221, 0.15)',
            }}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
              style={{
                background: `${typeColors[link.type]}15`,
                color: typeColors[link.type],
              }}
            >
              {typeLabels[link.type]}
            </span>
            <span className="text-sm text-[#b794c7] group-hover:text-white transition-colors flex-1 min-w-0 truncate">
              {link.title}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9080a0] group-hover:text-[#c77dff] transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function FAQSection({ faqs }: { faqs: Guide['faqs'] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id="faq" className="mt-16">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(26, 15, 46, 0.6)',
              border: '1px solid rgba(157, 78, 221, 0.15)',
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-5 flex items-start gap-3 cursor-pointer"
            >
              <ChevronRight
                className={`w-4 h-4 text-[#c77dff] shrink-0 mt-1 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-90' : ''
                }`}
              />
              <span className="text-white font-medium text-sm">{faq.question}</span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 pl-12">
                <p className="text-[#b794c7] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GuideContent({ guide }: { guide: Guide }) {
  const [activeId, setActiveId] = useState(guide.sections[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    for (const section of guide.sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [guide.sections]);

  const tocItems = guide.sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-8">
        <Container size="narrow">
          <FadeUp>
            <Breadcrumbs
              items={[
                { label: 'Guides', href: '/guides' },
                { label: guide.title, href: `/guides/${guide.slug}` },
              ]}
            />
            <div className="mt-6 mb-4 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[#9080a0] text-xs">
                <BookOpen className="w-3.5 h-3.5" />
                Pillar Guide
              </span>
              <span className="text-[#9080a0] text-xs">-</span>
              <span className="flex items-center gap-1.5 text-[#9080a0] text-xs">
                <Clock className="w-3.5 h-3.5" />
                {guide.readTime}
              </span>
              <span className="text-[#9080a0] text-xs">-</span>
              <span className="text-[#9080a0] text-xs">{guide.sections.length} sections</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {guide.title}
            </h1>
            <p className="text-[#b794c7] text-lg leading-relaxed max-w-2xl">
              {guide.description}
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* Main Content with Sidebar ToC */}
      <Section className="pb-20">
        <Container size="wide">
          <div className="max-w-6xl mx-auto flex gap-10">
            {/* Sidebar - hidden on mobile */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <TableOfContents sections={tocItems} activeId={activeId} />
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(157, 78, 221, 0.15)' }}>
                  <GrowthAuditCTA variant="compact" />
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* Mobile ToC */}
              <div className="lg:hidden mb-8">
                <GlassCard className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9080a0] mb-2">
                    In This Guide
                  </p>
                  <ol className="space-y-1">
                    {tocItems.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-center gap-2 text-sm text-[#b794c7] hover:text-white transition-colors py-1"
                        >
                          <span className="text-[#c77dff] text-xs font-mono w-5 text-right shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </div>

              {/* Sections */}
              {guide.sections.map((section, index) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <FadeUp delay={index * 0.03}>
                    <div className={index > 0 ? 'mt-14' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#c77dff] text-sm font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[rgba(199,125,255,0.2)] to-transparent" />
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                        {section.title}
                      </h2>
                      <div
                        className="prose-guide"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                      {section.keyTakeaway && <KeyTakeaway text={section.keyTakeaway} />}
                    </div>
                  </FadeUp>

                  {/* Insert CTA after section 4 */}
                  {index === 3 && (
                    <div className="my-12">
                      <GrowthAuditCTA
                        variant="inline"
                        title="Implementing these strategies?"
                        description="Our team can build and manage these systems for you. Start with a free growth audit."
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Related Links */}
              {guide.relatedLinks.length > 0 && (
                <RelatedLinks links={guide.relatedLinks} />
              )}

              {/* FAQ */}
              {guide.faqs.length > 0 && <FAQSection faqs={guide.faqs} />}

              {/* Bottom CTA */}
              <div className="mt-16">
                <GrowthAuditCTA
                  title="Ready to implement?"
                  description="Get a free growth audit and let our team help you put these strategies into action for your business."
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
