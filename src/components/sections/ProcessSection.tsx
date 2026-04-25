import { copy } from '@/lib/copy';

export function ProcessSection() {
  const { eyebrow, headline, steps } = copy.process;

  return (
    <section
      className="relative section-padding"
      style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}
      id="process"
    >
      <div className="container-wide">
        <header className="max-w-3xl mb-16">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] tracking-tight text-[color:var(--ivory)]">
            {headline}
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div key={step.n} className="card-flat p-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-[12px] text-[color:var(--accent)] tracking-widest">
                  {step.n}
                </span>
                <span className="flex-1 h-px" style={{ background: '#27272A' }} />
              </div>
              <h3 className="font-display text-[26px] leading-tight text-[color:var(--ivory)]">
                {step.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-[color:var(--ivory-dim)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
