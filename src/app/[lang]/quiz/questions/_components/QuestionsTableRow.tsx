import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { InputWithButton } from '@/components/ui/inputWithButton';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { IoMdCreate, IoMdEye, IoMdClose } from 'react-icons/io';

type QuestionProps = {
  idx: string;
  legend: string;
  bindType: string;
  bindQuestion: string;
  index: number;
};

function QuestionsTableRow({
  idx,
  legend,
  bindType,
  bindQuestion,
  index,
}: QuestionProps) {
  return (
    <TableRow
      key={index}
      className={cn('', index % 2 === 0 ? 'bg-muted' : 'bg-background')}
    >
      <TableCell id="edit-button" className="flex gap-1">
        <ButtonWithTooltip
          size={'sm'}
          variant={'outline'}
          tooltip="Open question"
        >
          <IoMdEye />
        </ButtonWithTooltip>
        <ButtonWithTooltip
          size={'sm'}
          variant={'outline'}
          tooltip="Edit question"
        >
          <IoMdCreate />
        </ButtonWithTooltip>
        <ButtonWithTooltip
          size={'sm'}
          variant={'default'}
          tooltip="Unbind question"
        >
          <IoMdClose />
        </ButtonWithTooltip>
      </TableCell>
      <TableCell id="idx">{idx}</TableCell>
      <TableCell id="legend">{legend}</TableCell>
      <TableCell id="type">{bindType}</TableCell>
      <TableCell id="question">{bindQuestion}</TableCell>
    </TableRow>
  );
}

export default QuestionsTableRow;
