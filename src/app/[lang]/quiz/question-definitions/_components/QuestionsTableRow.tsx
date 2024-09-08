import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { IoMdCreate } from 'react-icons/io';

type QuestionProps = {
  label: string;
  answerType: string;
  description: string;
  index: number;
};

function QuestionsTableRow({
  label,
  answerType,
  description,
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
          variant={'default'}
          tooltip="Edit question"
        >
          <IoMdCreate />
        </ButtonWithTooltip>
      </TableCell>
      <TableCell id="idx">{label}</TableCell>
      <TableCell id="legend">{answerType}</TableCell>
      <TableCell id="type">{description}</TableCell>
    </TableRow>
  );
}

export default QuestionsTableRow;
