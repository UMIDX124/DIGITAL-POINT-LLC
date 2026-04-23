import { copy } from '@/lib/copy';

export function TrustStrip() {
  return (
    <section
      className="relative py-10 border-b"
      style={{ background: '#0A0A0B', borderColor: '#27272A', borderTopWidth: 0 }}
      aria-label="Practices"
    >
      <div className="container-wide">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[11px] tracking-[0.22em] uppercase text-[color:var(--muted)] font-mono">
          {copy.trustStrip.map((item, i) => (
            <li key={item} className="flex items-center gap-10">
              <span>{item}</span>
              {i < copy.trustStrip.length - 1 && (
                <span className="hidden md:inline text-[color:var(--muted)]">·</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
