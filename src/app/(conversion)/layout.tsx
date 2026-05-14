import Link from 'next/link';
import { Logomark } from '@/components/brand/Logomark';

export default function ConversionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: 'var(--color-canvas)' }}>
      <header
        className="relative z-10"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 'var(--maxw-display)',
          marginInline: 'auto',
          width: '100%',
          borderBlockEnd: '1px solid var(--color-line-faint)',
        }}
      >
        <Link href="/" className="dpl-nav__brand" aria-label="Digital Point home">
          <Logomark mode="mark" variant="light" size={56} className="dpl-logo-conversion" />
          <span>Digital Point</span>
        </Link>

        <Link href="/" className="btn-link" style={{ fontSize: 'var(--text-sm)' }}>
          ← Back to site
        </Link>
      </header>

      <main id="main" className="relative z-10 flex-1">{children}</main>
    </div>
  );
}
