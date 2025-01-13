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

  return (
    <TableRow
      key={index}
      className={cn('', index % 2 === 0 ? 'bg-muted' : 'bg-background')}
    >
      <TableCell id="edit-button" className="flex gap-1">
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
      <TableCell id="idx">{label}</TableCell>
      <TableCell id="legend">{answerType}</TableCell>
      <TableCell id="type">{description}</TableCell>
    </TableRow>
  );
}

export default QuestionsTableRow;
