'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
  type ButtonsProps,
  ButtonsSection,
} from '../../../_components/ButtonsSection';

export default function StateButtons({
  children,
  buttons,
  className,
}: ButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.match(/[^/]+$/)?.[0] || '';

  const openEditModal = () => {
    router.push(pathname + '/' + 'edit');
  };

  return (
    <ButtonsSection
      className={cn('mt-2', className)}
      buttons={buttons}
      variants={['default', 'destructive', 'default']}
      onClickCallbacks={[() => {}, () => {}, () => {}]}
      disabledArray={[false, false]}
      // IconComponent={[null, getViewIcon]}
      // tooltips={[undefined, viewTooltip]}
    >
      {children}
    </ButtonsSection>
  );
}
