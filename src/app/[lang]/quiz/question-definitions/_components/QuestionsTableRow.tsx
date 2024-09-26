'use client';

import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { IoMdCreate } from 'react-icons/io';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type QuestionProps = {
  id: string;
  label: string;
  answerType: string;
  description: string;
  index: number;
};

function QuestionsTableRow({
  id,
  label,
  answerType,
  description,
  index,
}: QuestionProps) {
  const pathname = usePathname();

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
          asChild
        >
          <Link href={pathname + `/edit/${id}`}>
            <IoMdCreate />
          </Link>
        </ButtonWithTooltip>
      </TableCell>
      <TableCell id="idx">{label}</TableCell>
      <TableCell id="legend">{answerType}</TableCell>
      <TableCell id="type">{description}</TableCell>
    </TableRow>
  );
}

export default QuestionsTableRow;
