'use client';

import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { Combobox } from './Combobox';
import { Play, Link as LinkIcon, Unlink } from 'lucide-react';
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
  // const columns = Object.keys(header).length;
  const columnWidth = Math.round(100 / (6 + 2));

  return (
    <TableRow
      key={index}
      className={cn(
        'flex flex-row justify-between items-center w-full',
        index % 2 === 0 ? 'bg-muted' : 'bg-background'
      )}
    >
      <TableCell id="edit-button" className="w-[13%]">
        <ButtonWithTooltip
          size={'sm'}
          variant={'outline'}
          tooltip="Open question"
        >
          <Play size={16} />
        </ButtonWithTooltip>
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="idx">
        {idx}
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="legend">
        {legend}
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="type">
        {bindType}
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="question">
        {boundQuestion}
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`}>
        <Combobox idx={idx} />
      </TableCell>
    </TableRow>
  );
}

export default TiersTableRow;
