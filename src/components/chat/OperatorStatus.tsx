'use client';

import { useEffect, useState } from 'react';

type Props = {
  operator?: string;
};

export function OperatorStatus({ operator = 'Faizan' }: Props) {
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      setNow(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="cosmo-operator-status"
      data-design-only="true"
      aria-label="Cosmo trained agent · operator on call"
    >
      <div className="cosmo-operator-status__lhs">
        <span className="cosmo-operator-status__pulse" aria-hidden="true" />
        <span className="cosmo-operator-status__label">Cosmo · Trained agent</span>
      </div>
      <div className="cosmo-operator-status__rhs">
        {operator} on-call · {now || '--:--'}
      </div>
    </div>
  );
}

export default OperatorStatus;
