'use client';
import React from 'react';

import { ButtonsSection } from '../../_components/ButtonsSection';
import { type ButtonsProps } from '../../_components/ButtonsSection';
import { usePageContext } from '../_context/pageContext';
import { removeImages } from '../../actions';
import { toast } from '@/hooks/use-toast';

export function BucketButtons({ children, buttons }: ButtonsProps) {
  const {
    state: { selectedQuestionImages, selectedPlayerImages },
    selectQuestion,
    deselectQuestion,
    selectAllQuestions,
    deselectAllQuestions,
  } = usePageContext();

  const changeView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('change view');
  };
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

  return (
    <ButtonsSection
      className="mt-2"
      buttons={buttons}
      variants={['destructive', 'default']}
      onClickCallbacks={[deleteSelected, changeView]}
      disabledArray={[disableDelete(), true]}
    >
      {children}
    </ButtonsSection>
  );
}
