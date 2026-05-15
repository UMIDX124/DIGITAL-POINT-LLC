import Image from 'next/image';

export function FounderQuote() {
  return (
    <section className="dpl-section dpl-section--quote" aria-label="Founder signature quote">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">Section 06 · Signed</span>
      </div>
      <div className="dpl-section__page" aria-hidden="true">p.06 / p.09</div>
      <div className="dpl-section__inner">
        <p className="dpl-eyebrow">
          <span className="dpl-eyebrow__rule" aria-hidden="true" />
          Signed · Faizan
        </p>
        <blockquote className="dpl-quote__body">
          <span className="dpl-quote__mark" aria-hidden="true">&ldquo;</span>
          A four-person ops team costs four hundred thousand a year. We replace three of those four with agents. The fourth is a real human who watches the agents. That&rsquo;s the whole pitch.
          <span className="dpl-quote__mark" aria-hidden="true">&rdquo;</span>
        </blockquote>
        <div className="dpl-quote__attribution">
          <div className="dpl-quote__who">
            <Image
              src="/dp-founder-faizan.jpg"
              alt="M. Faizan Rafiq, Co-founder"
              width={96}
              height={96}
              sizes="48px"
              className="dpl-quote__avatar dpl-quote__avatar--photo"
            />
            <div className="dpl-quote__who-text">
              <div className="dpl-quote__name">M. Faizan Rafiq</div>
              <div className="dpl-quote__role">Co-founder · paid media + account restructure</div>
            </div>
          </div>
          <div className="dpl-quote__meta">
            <span>Audit no. 047 · Delivered 2026.05.12</span>
            <span>Wilmington, DE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderQuote;
