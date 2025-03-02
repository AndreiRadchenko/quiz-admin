'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { IoMdCreate, IoMdFlash, IoMdVolumeOff } from 'react-icons/io';
import { PencilLine } from 'lucide-react';
import { Input } from '@/components/ui/input';

export type PlayerProps = {
  id: string;
  name: string;
  active: boolean;
  usedPass: boolean;
  boughtOut: boolean;
  camera: string;
  index: number;
};

function PlayersTableRow({
  index,
  id,
  name,
  active,
  usedPass,
  boughtOut,
  camera,
}: PlayerProps) {
  const pathname = usePathname();
  const columnWidth = Math.round(100 / (10 + 2)) + '%';

  return (
    <TableRow
      key={id}
      className={cn(
        'flex flex-row justify-between items-center w-full',
        index % 2 === 0 ? 'bg-muted' : 'bg-background'
      )}
    >
      <TableCell className="w-[8%] flex flex-row gap-1" id="edit-button">
        <ButtonWithTooltip size={'sm'} tooltip="edit player data" asChild>
          <Link href={pathname + `/edit/${id}?seat=${index + 1}`}>
            <PencilLine size={16} />
          </Link>
        </ButtonWithTooltip>
      </TableCell>
      <TableCell className={` w-[${columnWidth}]`} id="seat">
        {index + 1}
      </TableCell>
      <TableCell className={` w-[${columnWidth}]`} id="id">
        {id}
      </TableCell>
      <TableCell className="w-[10%]" id="name">
        {name}
      </TableCell>
      <TableCell className={` w-[${columnWidth}]`} id="active">
        {active ? 'true' : 'false'}
      </TableCell>
      <TableCell className={` w-[${columnWidth}]`} id="usedPass">
        {usedPass ? 'true' : 'false'}
      </TableCell>
      <TableCell className={` w-[${columnWidth}]`} id="boughtOut">
        {boughtOut ? 'true' : 'false'}
      </TableCell>
      <TableCell className={` w-[${columnWidth}]`} id="camera">
        {camera}
      </TableCell>
      <TableCell className={` w-[${columnWidth}]`} id="swap">
        <div className="flex flex-row gap-1">
          <Input className="p-1 w-12 size-9 text-inherit" accept=".csv" />
          <ButtonWithTooltip size={'sm'} tooltip={'swap players'}>
            Swap
          </ButtonWithTooltip>
        </div>
      </TableCell>
      <TableCell id="commCheck" className={` w-[${columnWidth}] flex gap-2`}>
        <ButtonWithTooltip size={'sm'} tooltip="controlCommCheckStart">
          <IoMdFlash />
        </ButtonWithTooltip>
        <ButtonWithTooltip size={'sm'} tooltip="controlCommCheckSilent">
          <IoMdVolumeOff />
        </ButtonWithTooltip>
      </TableCell>
    </TableRow>
  );
}

export default PlayersTableRow;
