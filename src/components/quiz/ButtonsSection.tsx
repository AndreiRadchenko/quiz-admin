'use client';

import React, { useState } from 'react';
import { FilterRadioGroup } from '@/components/quiz/FilterRadioGroup';
import { type FilterValue } from '@/components/quiz/FilterRadioGroup';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type ButtonsProps = {
  filter?: {
    all: FilterValue;
    active: FilterValue;
    passes: FilterValue;
  };
  buttons: {
    [key: string]: {
      buttonText: string;
      tooltip: string;
    };
  };
  data?: {};
};

export function ButtonsSection({ filter, buttons }: ButtonsProps) {
  const [filterValue, setFilterValue] = useState<FilterValue>('all');

  const { importFileBtn } = buttons;
  return (
    <section
      className={cn('flex justify-between my-6', !filter && 'justify-end')}
    >
      {filter && (
        <FilterRadioGroup filter={filter} setFilterValue={setFilterValue} />
      )}
      <div className={cn('flex gap-4 ', filterValue !== 'all' ? 'hidden' : '')}>
        <div className="flex flex-row gap-1">
          <Input
            type="file"
            className="w-80 placeholder:background text-inherit"
            accept=".csv"
          />
          <ButtonWithTooltip tooltip={importFileBtn.tooltip}>
            {Object.values(buttons)[0].buttonText}
          </ButtonWithTooltip>
        </div>
        {Object.keys(buttons)
          .slice(1)
          .map((key, idx) => (
            <ButtonWithTooltip
              key={idx}
              variant={
                idx === 0 ? 'accent' : idx === 2 ? 'destructive' : 'default'
              }
              tooltip={buttons[key].tooltip}
            >
              {buttons[key].buttonText}
            </ButtonWithTooltip>
          ))}
      </div>
    </section>
  );
}
