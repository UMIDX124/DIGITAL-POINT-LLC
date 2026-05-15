import Link from 'next/link';

export function CTASection() {
  return (
    <section className="section section-divider">
      <div className="container-wide">
        <div className="section-header section-header--center">
          <p className="eyebrow eyebrow--accent">Let&rsquo;s map the work</p>
          <h2 className="section-title text-balance">
            Audit your repeatable work in 45 minutes.
          </h2>
          <p className="section-desc text-pretty">
            45 minutes with a co-founder. Free. Written plan within 5 business days.
            We come back with which workflows fit agents and which still need operators.
          </p>
          <div className="hero-cta-row" style={{ marginBlockStart: '0', justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">
              Book a free audit
            </Link>
            <Link href="/recovery" className="btn btn-ghost">
              Recover a broken agent
            </Link>
          </div>
          <p className="hero-microcopy">
            Free · 45 min · Co-founder reviews your stack · Written plan within five days
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
