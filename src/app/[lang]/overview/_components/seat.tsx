import React from 'react';
import { cn } from '@/lib/utils';

type SeatProps = {
  player: number;
};

export function Seat({ player }: SeatProps) {
  return (
    <div
      className={cn(
        'w-10 min-h-10 rounded-full bg-muted-foreground',
        `seat-${player}`
      )}
    ></div>
  );
}
