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
  return (
    <TableRow
      key={index}
      className={cn('', index % 2 === 0 ? 'bg-muted' : 'bg-background')}
    >
      <TableCell className={'p-4'} id="id">
        {id}
      </TableCell>
      <TableCell className={'p-4'} id="name">
        {name}
      </TableCell>
      <TableCell className={'p-4'} id="answer">
        {answer}
      </TableCell>
      <TableCell className={'p-4'} id="correct">
        {correct ? 'true' : 'false'}
      </TableCell>
      <TableCell className={'p-4'} id="pass">
        {pass ? 'true' : 'false'}
      </TableCell>
      <TableCell className={'p-4'} id="auto">
        {auto ? 'true' : 'false'}
      </TableCell>
    </TableRow>
  );
}

export default AnswersTableRow;
