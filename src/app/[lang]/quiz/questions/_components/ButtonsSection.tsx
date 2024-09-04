'use client';

import React, { useState } from 'react';
import { InputWithButton } from '@/components/ui/inputWithButton';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { cn } from '@/lib/utils';

type ButtonsProps = {
  buttons: {
    [key: string]: {
      buttonText: string;
      tooltip: string;
    };
  };
  data?: {};
};

export function ButtonsSection({ buttons }: ButtonsProps) {
  const { importFileBtn } = buttons;
  return (
    <section className="flex justify-end my-6">
      <div className="flex gap-4">
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
              variant={idx === 2 ? 'accent' : 'default'}
              tooltip={buttons[key].tooltip}
            >
              {buttons[key].buttonText}
            </ButtonWithTooltip>
          ))}
      </div>
    </section>
  );
}
