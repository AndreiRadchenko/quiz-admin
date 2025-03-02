'use client';

import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { PencilLine, Eye } from 'lucide-react';

import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
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
  // const columnWidth = Math.round(100 / (4 + 4));
  const columnWidth = 15;

  return (
    <TableRow
      key={index}
      className={cn(
        'flex flex-row justify-between items-center w-full',
        index % 2 === 0 ? 'bg-muted' : 'bg-background'
      )}
    >
      <TableCell id="edit-button" className="flex flex-row gap-1 w-[14%]">
        <ButtonWithTooltip
          size={'sm'}
          variant={'default'}
          tooltip="View question"
          asChild
        >
          <Link href={pathname + `/${id}`}>
            <Eye size={16} />
          </Link>
        </ButtonWithTooltip>
        <ButtonWithTooltip
          size={'sm'}
          variant={'default'}
          tooltip="Edit question"
          asChild
        >
          <Link href={pathname + `/edit/${id}`}>
            <PencilLine size={16} />
          </Link>
        </ButtonWithTooltip>
      </TableCell>
      <TableCell className="w-[14%]" id="idx">
        {label}
      </TableCell>
      <TableCell className="w-[14%]" id="legend">
        {answerType}
      </TableCell>
      <TableCell className="w-[36%]" id="type">
        {description}
      </TableCell>
    </TableRow>
  );
}

export default QuestionsTableRow;
