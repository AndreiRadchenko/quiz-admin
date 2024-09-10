'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import NavMenu from './components/NavMenu';
import {  type MenuType } from '../../../dictionaries/dictionaries';

type Props = {
  children: React.ReactNode;
  menu: MenuType;
};

export function Nav({ children, menu }: Props) {
  return (
    <nav
      id="navbar"
      className="bg-secondary text-secondary-foreground fixed top-0 left-0 z-10 w-screen"
    >
      <div className="container flex justify-between">
        <div className="flex justify-start">{children}</div>
        <NavMenu menu={menu} />
      </div>
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathName = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        `p-4 hover:bg-secondary-hover focus-visible:bg-secondary-hover
        focus-visible:text-secondary-foreground text-nav-foreground`,
        pathName === props.href &&
          'hover:bg-secondary-active bg-secondary-active'
      )}
    />
  );
}
