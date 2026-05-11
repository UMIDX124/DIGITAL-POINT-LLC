import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-meta">
          <span>DPL · 2017</span>
          <span className="hero-meta__sep" aria-hidden="true" />
          <span>Production AI agent operations</span>
        </div>

        <h1 className="hero-title text-balance">
          Hire the <span className="hero-title__amber">AI</span>.<br />
          Skip the headcount.
        </h1>

        <p className="hero-sub text-pretty">
          Production AI agents we deploy and operate for you.
          Operator-backed. No license to manage.
          $2,500/month replaces $400K of in-house ops.
        </p>

        <div className="hero-cta-row">
          <Link href="/audit" className="btn btn-primary">
            Book a free audit
          </Link>
          <Link href="/recovery" className="btn btn-ghost">
            Or fix a broken agent
          </Link>
        </div>

        <p className="hero-microcopy">
          Free audit · Written plan in 5 days · Co-founder reviews your setup
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
