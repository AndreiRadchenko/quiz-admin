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

function PlayerTableRow({
  id,
  name,
  lastModified,
  size,
  index,
}: QuestionProps) {
  const {
    state: { selectedPlayerImages },
    selectPlayer,
    deselectPlayer,
  } = usePageContext();

  const isRowSelected = selectedPlayerImages.some(e => e === name);

  const onChange = (checked: CheckboxPrimitive.CheckedState) => {
    checked ? selectPlayer(name) : deselectPlayer(name);
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

export default PlayerTableRow;
