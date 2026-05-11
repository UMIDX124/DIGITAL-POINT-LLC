import Link from 'next/link';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Link> & {
  className?: string;
  children?: React.ReactNode;
};

export function MagneticCTA({ className, children, href, ...rest }: Props) {
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export default MagneticCTA;
