import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';

type Props = {
  action: (formData: FormData) => Promise<void>;
  idx: number;
  field: string;
  label: string;
  buttonText: string;
};

export function ImportFileForm({ action, field, label, buttonText }: Props) {
  return (
    <form action={action} className="flex flex-col justify-around w-fit">
      <Label className="mb-1 w-fit" htmlFor="input">
        {label}
      </Label>
      <div className="flex flex-row gap-2">
        <Input
          id="input"
          type="file"
          name="file"
          className="w-80 placeholder:background text-inherit"
          accept={field === 'questionImages' ? '.png' : '.csv'}
          multiple={field === 'questionImages'}
        />
        <ButtonWithTooltip className="w-40">{buttonText}</ButtonWithTooltip>
      </div>
    </form>
  );
}
