type Status = 'active' | 'done' | 'pending';

type Step = {
  label: string;
  sublabel?: string;
  status?: Status;
};

type Props = {
  steps: Step[];
  context?: 'light' | 'dark';
  className?: string;
};

export function FlowDiagram({ steps, context = 'light', className }: Props) {
  const trackColor = context === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(10,10,10,0.12)';
  const labelColor = context === 'dark' ? 'var(--color-text-dark-primary)' : 'var(--color-text-primary)';
  const subColor = context === 'dark' ? 'var(--color-text-dark-secondary)' : 'var(--color-text-secondary)';
  const pendingBg = context === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,10,0.04)';

  return (
    <div
      className={className}
      role="list"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: 0,
        position: 'relative',
      }}
    >
      {steps.map((step, i) => {
        const status: Status = step.status ?? (i === 0 ? 'active' : 'pending');
        const isLast = i === steps.length - 1;
        const circleFill =
          status === 'done'
            ? 'var(--color-accent)'
            : status === 'active'
            ? 'var(--color-accent-faint)'
            : pendingBg;
        const circleBorder =
          status === 'pending'
            ? trackColor
            : 'var(--color-accent)';
        const circleText =
          status === 'done'
            ? '#0a0a0a'
            : status === 'active'
            ? (context === 'dark' ? 'var(--color-accent)' : 'var(--color-text-primary)')
            : context === 'dark'
            ? 'var(--color-text-dark-secondary)'
            : 'var(--color-text-secondary)';

        return (
          <div
            key={step.label}
            role="listitem"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', position: 'relative' }}
          >
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    left: 0,
                    right: '50%',
                    top: '50%',
                    height: '2px',
                    background: trackColor,
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    left: '50%',
                    right: 0,
                    top: '50%',
                    height: '2px',
                    background: trackColor,
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '50%',
                  background: circleFill,
                  border: `2px solid ${circleBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: circleText,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 0.5rem' }}>
              <span style={{ color: labelColor, fontWeight: 600, fontSize: '0.875rem' }}>{step.label}</span>
              {step.sublabel && (
                <span style={{ color: subColor, fontSize: '0.75rem', lineHeight: 1.4 }}>{step.sublabel}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FlowDiagram;
