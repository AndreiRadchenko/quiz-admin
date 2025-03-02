'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMutationState, useQueryClient } from '@tanstack/react-query';

import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { Combobox } from './Combobox';
import { Play, Link as LinkIcon } from 'lucide-react';
import { QuestionDataType, TierDataType } from '@/types/dataTypes';
import { QUERYKEY } from '@/services/queryKeys';

type TierProps = TierDataType & { index: number };

function TiersTableRow({
  id,
  idx,
  legend,
  answerType,
  boundQuestion,
  index,
}: TierProps) {
  const pathname = usePathname();
  const columnWidth = Math.round(100 / (6 + 2));

  const variables = useMutationState<FormData>({
    filters: { mutationKey: [`boundQuestion${idx}`], status: 'pending' },
    select: mutation => mutation.state.variables as FormData,
  });

  const BoundQuestion = () => {
    let bindData: string | null = null;
    if (variables.length > 0) {
      bindData = (variables[0] as FormData).get('boundQuestion') as string;
    }
    return variables.length > 0 ? (
      <span className="text-accent opacity-80 italic">
        {bindData !== 'unbound' ? 'Binding question ' + bindData : 'Unbinding'}
      </span>
    ) : (
      <span>{boundQuestion}</span>
    );
  };

  return (
    <TableRow
      key={index}
      className={cn(
        'flex flex-row justify-between items-center w-full',
        index % 2 === 0 ? 'bg-muted' : 'bg-background'
      )}
    >
      <TableCell id="edit-button" className="flex flex-row gap-1 w-[13%]">
        <ButtonWithTooltip
          size={'sm'}
          variant={'outline'}
          tooltip="Open question"
          asChild
        >
          <Link href={pathname + `/${id}`}>
            <Play size={16} />
          </Link>
        </ButtonWithTooltip>
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="idx">
        {idx}
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="legend">
        {legend}
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="type">
        {answerType}
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`} id="question">
        <BoundQuestion />
      </TableCell>
      <TableCell className={`w-[${columnWidth}%]`}>
        <Combobox idx={idx} />
      </TableCell>
    </TableRow>
  );
}

export default TiersTableRow;
