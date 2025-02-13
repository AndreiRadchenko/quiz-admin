'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { List, LayoutGrid } from 'lucide-react';
import {
  type ButtonsProps,
  ButtonsSection,
} from '../../../_components/ButtonsSection';

import { removeImages } from '@/actions/buckets';
import { toast } from '@/hooks/use-toast';
import { config } from '@/config';

export default function QuestionButtons({ children, buttons }: ButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.match(/[^/]+$/)?.[0] || '';

  const openEditModal = () => {
    router.push(pathname + '/' + 'edit');
  };

  return (
    <ButtonsSection
      className="mt-2"
      buttons={buttons}
      variants={['default', 'default', 'destructive']}
      onClickCallbacks={[openEditModal, () => {}, () => {}]}
      disabledArray={[false, false]}
      // IconComponent={[null, getViewIcon]}
      // tooltips={[undefined, viewTooltip]}
    >
      {children}
    </ButtonsSection>
  );
}
