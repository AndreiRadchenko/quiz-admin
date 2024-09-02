'use client';

import React, { useState } from 'react';
import { FilterRadioGroup } from './FilterRadioGroup';
import { InputWithButton } from '@/components/ui/inputWithButton';
import { type FilterValue } from './FilterRadioGroup';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { cn } from '@/lib/utils';

type ButtonsProps = {
  filter: {
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
    <section className="flex justify-between my-6">
      <FilterRadioGroup filter={filter} setFilterValue={setFilterValue} />

      <>
        <div
          className={cn('flex gap-4 ', filterValue !== 'all' ? 'hidden' : '')}
        >
          <InputWithButton
            btnName={importFileBtn.buttonText}
            tooltip={importFileBtn.tooltip}
            type="file"
            className="w-80 placeholder:background text-inherit"
            accept=".csv"
          />
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
      </>
    </section>
  );
}
