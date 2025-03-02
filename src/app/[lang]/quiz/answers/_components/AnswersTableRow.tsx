import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { IoMdCreate } from 'react-icons/io';

type AnswerProps = {
  id: string;
  name: string;
  answer: string;
  correct: boolean;
  pass: boolean;
  auto: boolean;
  index: number;
};

function AnswersTableRow({
  id,
  name,
  answer,
  correct,
  pass,
  auto,
  index,
}: AnswerProps) {
  const columnWidth = Math.round(100 / (6 + 2));

  return (
    <TableRow
      key={index}
      className={cn(
        'flex flex-row justify-between items-center w-full',
        index % 2 === 0 ? 'bg-muted' : 'bg-background'
      )}
    >
      <TableCell className={`px-2 py-4 w-[${columnWidth}%]`} id="id">
        {id}
      </TableCell>
      <TableCell className={`px-2 py-4 w-[${columnWidth}%]`} id="name">
        {name}
      </TableCell>
      <TableCell className={`px-2 py-4 w-[${columnWidth}%]`} id="answer">
        {answer}
      </TableCell>
      <TableCell className={`px-2 py-4 w-[${columnWidth}%]`} id="correct">
        {correct ? 'true' : 'false'}
      </TableCell>
      <TableCell className={`px-2 py-4 w-[${columnWidth}%]`} id="pass">
        {pass ? 'true' : 'false'}
      </TableCell>
      <TableCell className={`px-2 py-4 w-[${columnWidth}%]`} id="auto">
        {auto ? 'true' : 'false'}
      </TableCell>
    </TableRow>
  );
}

export default AnswersTableRow;
