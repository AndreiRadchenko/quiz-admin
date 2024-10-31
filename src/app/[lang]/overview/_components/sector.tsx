import React from 'react';
import { cn } from '@/lib/utils';
import { type Players } from '../page';

type SectorProps = {
  inner?: boolean;
  players: Players;
  offset: number;
};

export function Sector({ players, offset, inner = false }: SectorProps) {
  const playersInCircle = inner ? 58 : 70;
  const radius = inner ? 350 : 450;

  return players.map((player, index) => (
    <div
      key={index}
      className={cn(
        `absolute w-8 h-8 bg-muted-foreground text-gray-950 flex items-center
        justify-center rounded-full `,
        player.active === undefined
          ? ''
          : player.active
            ? 'bg-green-800 text-gray-100'
            : 'bg-red-800 text-gray-100',
        player.active && player.usedPass && 'border-2 border-blue-500'
      )}
      style={{
        transform: `rotate(${index * (360 / playersInCircle) + offset}deg) translate(${radius}px) rotate(-${index * (360 / playersInCircle) + offset}deg)`,
      }}
    >
      {player.number}
    </div>
  ));
}
