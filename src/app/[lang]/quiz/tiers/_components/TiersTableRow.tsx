'use client';

import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { IoMdLink, IoMdEye, IoMdClose } from 'react-icons/io';
import { IoUnlinkOutline } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type QuestionProps = {
  idx: string;
  legend: string;
  bindType: string;
  boundQuestion: string;
  index: number;
};

function TiersTableRow({
  idx,
  legend,
  bindType,
  boundQuestion,
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
          variant={'outline'}
          tooltip="Open question"
        >
          <IoMdEye />
        </ButtonWithTooltip>
        <ButtonWithTooltip
          size={'sm'}
          variant={'outline'}
          tooltip="Bind question"
          asChild
        >
          <Link href={pathname + `/bind/${idx}?legend=${legend}`}>
            <IoMdLink />
          </Link>
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
      <TableCell id="question">{boundQuestion}</TableCell>
    </TableRow>
  );
}

export default TiersTableRow;
