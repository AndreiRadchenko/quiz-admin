'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-start px-4">
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathName = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        'p-4 hover:bg-secondary focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathName === props.href && 'bg-secondary text-secondary-foreground'
      )}
    />
  );
}