import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { InputWithButton } from '@/components/ui/inputWithButton';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { IoMdCreate, IoMdFlash, IoMdVolumeOff } from 'react-icons/io';

type playerProps = {
  id: string;
  name: string;
  active: boolean;
  usedPass: boolean;
  boughtOut: boolean;
  camera: string;
  idx: number;
};

function PlayersTableRow({
  idx,
  id,
  name,
  active,
  usedPass,
  boughtOut,
  camera,
}: playerProps) {
  return (
    <TableRow
      key={id}
      className={cn('', idx % 2 === 0 ? 'bg-muted' : 'bg-background')}
    >
      <TableCell id="edit-button">
        <ButtonWithTooltip size={'sm'} tooltip="edit player data">
          <IoMdCreate />
        </ButtonWithTooltip>
      </TableCell>
      <TableCell id="seat">{idx + 1}</TableCell>
      <TableCell id="id">{id}</TableCell>
      <TableCell id="name">{name}</TableCell>
      <TableCell id="active">{active ? 'true' : 'false'}</TableCell>
      <TableCell id="usedPass">{usedPass ? 'true' : 'false'}</TableCell>
      <TableCell id="boughtOut">{boughtOut ? 'true' : 'false'}</TableCell>
      <TableCell id="camera">{camera}</TableCell>
      <TableCell id="swap">
        <InputWithButton
          className="w-12 size-9"
          btnName="Swap"
          btnSize={'sm'}
        />
      </TableCell>
      <TableCell id="commCheck" className="flex gap-2">
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
