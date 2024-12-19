'use client';

import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

import { usePageContext } from '../../_context/pageContext';

type QuestionProps = {
  id: string;
  name: string;
  lastModified: string;
  size: number;
  index: number;
};

function ImagesTableRow({
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
    <TableRow
      key={index}
      className={cn(
        isRowSelected && 'font-bold',
        index % 2 === 0 ? 'bg-muted' : 'bg-background'
      )}
    >
      <TableCell id="edit-button" className="flex gap-1">
        <Checkbox
          className="w-6 h-6"
          checked={isRowSelected}
          onCheckedChange={onChange}
        />
      </TableCell>
      <TableCell id="idx">{name}</TableCell>
      <TableCell id="legend">{lastModified}</TableCell>
      <TableCell id="type">{(size / 1024 / 1024).toFixed(1)} MiB</TableCell>
    </TableRow>
  );
}

export default ImagesTableRow;
