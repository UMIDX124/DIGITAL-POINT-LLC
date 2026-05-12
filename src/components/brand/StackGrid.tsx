type Item = {
  label: string;
  role: string;
  icon?: string;
  accent?: boolean;
};

type Props = {
  items: Item[];
  context?: 'light' | 'dark';
  className?: string;
};

export function StackGrid({ items, context = 'light', className }: Props) {
  const cardBg = context === 'dark' ? 'var(--color-canvas-dark-raised)' : 'var(--color-canvas-raised)';
  const cardBorder = context === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,10,0.08)';
  const labelColor = context === 'dark' ? 'var(--color-text-dark-primary)' : 'var(--color-text-primary)';
  const roleColor = context === 'dark' ? 'var(--color-text-dark-tertiary)' : 'var(--color-text-tertiary)';

  return (
    <div
      className={className}
      role="list"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))',
        gap: '1rem',
      }}
    >
      {items.map((item) => {
        const accent = !!item.accent;
        return (
          <article
            key={item.label}
            role="listitem"
            style={{
              padding: '1.25rem',
              background: cardBg,
              border: `1px solid ${accent ? 'var(--color-line-accent)' : cardBorder}`,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              position: 'relative',
            }}
          >
            <header
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: accent ? 'var(--color-accent)' : roleColor,
              }}
            >
              {item.icon && (
                <span aria-hidden="true" style={{ fontSize: '0.875rem', lineHeight: 1 }}>{item.icon}</span>
              )}
              <span>{item.role}</span>
            </header>
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: '1rem',
                color: labelColor,
                lineHeight: 1.3,
              }}
            >
              {item.label}
            </p>
            {accent && (
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                }}
              />
            )}
          </article>
        );
      })}
    </div>
  );
}

export default StackGrid;
