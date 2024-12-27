'use client';
import React from 'react';

import { ButtonsSection } from '../../_components/ButtonsSection';
import { type ButtonsProps } from '../../_components/ButtonsSection';
import { usePageContext } from '../_context/pageContext';
import { removeImages } from '../../actions';
import { toast } from '@/hooks/use-toast';
import { List, LayoutGrid } from 'lucide-react';

export function BucketButtons({ children, buttons }: ButtonsProps) {
  const {
    bucketsLocale: { tooltips },
    state: { selectedQuestionImages, selectedPlayerImages, view },
    deselectQuestion,
    changeViewType,
  } = usePageContext();

  const deleteSelected = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    (async () => {
      const { messageType, toastMessage } = await removeImages(
        selectedQuestionImages
      );
      toastMessage !== '' &&
        toast({
          variant: messageType === 'error' ? 'destructive' : 'default',
          // title: messageType === 'error' ? messageType.toLocaleUpperCase() : '',
          description: toastMessage,
        });
    })();
    selectedQuestionImages.map(img => deselectQuestion(img));
  };

  const disableDelete = () => selectedQuestionImages.length === 0;

  const changeView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    view === 'list' ? changeViewType('grid') : changeViewType('list');
  };

  const getViewIcon = () => (view === 'list' ? <LayoutGrid /> : <List />);

  const viewTooltip = view === 'list' ? tooltips?.showGrid : tooltips?.showList;

  return (
    <ButtonsSection
      className="mt-2"
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
