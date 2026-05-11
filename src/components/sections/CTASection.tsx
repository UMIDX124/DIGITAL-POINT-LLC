import Link from 'next/link';

export function CTASection() {
  return (
    <section className="section section-divider">
      <div className="container-wide">
        <div className="section-header section-header--center">
          <p className="eyebrow eyebrow--accent">Let&apos;s map the work</p>
          <h2 className="section-title text-balance">
            Where could AI be running your repeatable work?
          </h2>
          <p className="section-desc text-pretty">
            45 minutes with a co-founder. Free. Written plan within 5 business days.
            What AI can run, what automation can stitch, where operators stay.
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
            Free · 30 min · No sales pitch · Co-founder reviews your setup
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
