'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import NavMenu from './components/NavMenu';
import { type MenuType } from '../../../dictionaries/dictionaries';
import logo from '../../../public/1percentclub.png';

import { S3Service } from '@/services/s3Services';
import { useSystemState } from '@/context/SystemStateProvider';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  menu: MenuType;
}

export function Nav({ children, menu, className }: Props) {
  const { updateQuestionImages } = useSystemState();
  // S3Service.onUpdateQuestionsImages = updateQuestionImages;
  // S3Service.getInstance(updateQuestionImages);

  // useEffect(() => {
  //   (async () => {
  //     const s3Service = await S3Service.getInstance(updateQuestionImages);
  //   })();
  // }, [updateQuestionImages]);

  return (
    <nav
      id="navbar"
      className="bg-secondary text-secondary-foreground fixed top-0 left-0 z-10 w-screen"
    >
      <div className="container flex flex-row justify-start items-center gap-16">
        <Image
          className={'py-0'}
          src={logo}
          alt={'logo'}
          width={48}
          height={24}
          priority
        />
        <div className="flex justify-start">{children}</div>
        <NavMenu menu={menu} className="pt-1 flex-grow text-right" />
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
