'use client';
import React from 'react';

import { ButtonsSection } from '../../_components/ButtonsSection';
import { type ButtonsProps } from '../../_components/ButtonsSection';
import { usePageContext } from '../_context/pageContext';

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
    console.log('delete selected: ', selectedQuestionImages);
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
