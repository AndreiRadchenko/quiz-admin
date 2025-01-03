'use client';

import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import ImagesTableRow from '../../_components/ImagesTableRow';

import { usePageContext } from '../../_context/pageContext';

type QuestionProps = {
  id: string;
  name: string;
  lastModified: string;
  size: number;
  index: number;
};

function QuestionTableRow({
  id,
  name,
  lastModified,
  size,
  index,
}: QuestionProps) {
  const {
    state: { selectedQuestionImages },
    selectQuestion,
    deselectQuestion,
  } = usePageContext();

  const isRowSelected = selectedQuestionImages.some(e => e === name);

  const onChange = (checked: CheckboxPrimitive.CheckedState) => {
    checked ? selectQuestion(name) : deselectQuestion(name);
  };

  return (
    <ImagesTableRow
      id={id}
      name={name}
      lastModified={lastModified}
      size={size}
      index={index}
      isRowSelected={isRowSelected}
      onChange={onChange}
    />
  );
}

export default QuestionTableRow;
