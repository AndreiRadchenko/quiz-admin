'use client';

import React from 'react';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { cn } from '@/lib/utils';
import { ButtonVariantProps } from '@/components/ui/button';

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
  IconComponent?: (React.ComponentType | null)[];
  tooltips?: (string | undefined)[];
  data?: {};
};

export function ButtonsSection({
  className,
  children,
  buttons,
  variants = ['default'],
  onClickCallbacks,
  disabledArray = Object.keys(buttons).map(e => false),
  IconComponent = undefined,
  tooltips = undefined,
}: ButtonsProps) {
  return (
    <section className={cn('flex my-6 items-end gap-2 justify-end', className)}>
      <div className="flex flex-row gap-1">{children}</div>
      {Object.keys(buttons).map((key, idx) => {
        const Icon = IconComponent && IconComponent[idx];
        return (
          <ButtonWithTooltip
            key={idx}
            variant={variants[idx] ? variants[idx] : 'default'}
            tooltip={tooltips ? tooltips[idx] : buttons[key].tooltip}
            onClick={onClickCallbacks ? onClickCallbacks[idx] : () => {}}
            disabled={disabledArray[idx]}
          >
            {Icon && <Icon />}
            {buttons[key].buttonText}
          </ButtonWithTooltip>
        );
      })}
    </section>
  );
}
