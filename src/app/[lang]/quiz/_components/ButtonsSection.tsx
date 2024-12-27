'use client';

import React, { useState } from 'react';
import { FilterRadioGroup } from '@/components/quiz/FilterRadioGroup';
import { type FilterValue } from '@/components/quiz/FilterRadioGroup';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { buttonVariants, ButtonVariantProps } from '@/components/ui/button';

export type OnClickFunction = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export type ButtonsProps = {
  children?: React.ReactNode;
  className?: string;
  buttons: {
    [key: string]: {
      buttonText: string;
      tooltip: string;
    };
  };
  variants?: ButtonVariantProps[];
  onClickCallbacks?: OnClickFunction[];
  disabledArray?: boolean[];
  data?: {};
};

export function ButtonsSection({
  className,
  children,
  buttons,
  variants = ['default'],
  onClickCallbacks,
  disabledArray = Object.keys(buttons).map(e => false),
}: ButtonsProps) {
  const [filterValue, setFilterValue] = useState<FilterValue>('all');

  const importFileBtn = Object.values(buttons)[0];
  return (
    <section className={cn("flex my-6 items-end gap-2 justify-end", className)}>
      <div className="flex flex-row gap-1">{children}</div>
      {Object.keys(buttons).map((key, idx) => (
        <ButtonWithTooltip
          key={idx}
          variant={variants[idx] ? variants[idx] : 'default'}
          tooltip={buttons[key].tooltip}
          onClick={onClickCallbacks ? onClickCallbacks[idx] : () => {}}
          disabled={disabledArray[idx]}
        >
          {buttons[key].buttonText}
        </ButtonWithTooltip>
      ))}
    </section>
  );
}
