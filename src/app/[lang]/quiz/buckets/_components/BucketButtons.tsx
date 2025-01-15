'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

import { List, LayoutGrid } from 'lucide-react';
import { ButtonsSection } from '../../_components/ButtonsSection';

import { usePageContext } from '../_context/pageContext';
import { removeImages } from '@/actions/buckets';
import { toast } from '@/hooks/use-toast';
import { type ButtonsProps } from '../../_components/ButtonsSection';
import { config } from '@/config';

export function BucketButtons({ children, buttons }: ButtonsProps) {
  const pathname = usePathname();
  const page = pathname.match(/[^/]+$/)?.[0] || '';
  const {
    bucketsLocale: { tooltips },
    state: { selectedQuestionImages, selectedPlayerImages, view },
    deselectQuestion,
    deselectPlayer,
    changeViewType,
  } = usePageContext();

  const selectedImages =
    page === config.S3_BUCKET_QUESTIONS
      ? selectedQuestionImages
      : selectedPlayerImages;
  const deselectImages =
    page === config.S3_BUCKET_QUESTIONS ? deselectQuestion : deselectPlayer;

  const deleteSelected = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    (async () => {
      const { messageType, toastMessage } = await removeImages(
        selectedImages,
        page
      );
      toastMessage !== '' &&
        toast({
          variant: messageType === 'error' ? 'destructive' : 'default',
          // title: messageType === 'error' ? messageType.toLocaleUpperCase() : '',
          description: toastMessage,
        });
    })();
    selectedImages.map(img => deselectImages(img));
  };

  const disableDelete = () => selectedImages.length === 0;

  const changeView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    view === 'list' ? changeViewType('grid') : changeViewType('list');
  };

  const getViewIcon = () => (view === 'list' ? <LayoutGrid /> : <List />);

  const viewTooltip = view === 'list' ? tooltips?.showGrid : tooltips?.showList;

  return (
    <ButtonsSection
      className="my-6 mt-2"
      buttons={buttons}
      variants={['destructive', 'default']}
      onClickCallbacks={[deleteSelected, changeView]}
      disabledArray={[disableDelete(), false]}
      IconComponent={[null, getViewIcon]}
      tooltips={[undefined, viewTooltip]}
    >
      {children}
    </ButtonsSection>
  );
}
