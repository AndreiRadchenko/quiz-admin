'use client';
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { type ToastMessageType } from '@/context/SystemStateProvider';

type Props = {
  // action: (prevState: unknown, formData: FormData) => void | Promise<String>;
  action: any;
  idx: number;
  field: string;
  label: string;
  buttonText: string;
};

export function ImportFileForm({ action, field, label, buttonText }: Props) {
  const { toast } = useToast();
  const [message, formAction, isPending] = useFormState(action, null);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  // Used to disable button until files have been chosen
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    setSelectedFile(selectedFiles);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSelectedFile([]);
    const form = event.currentTarget;
    setTimeout(() => {
      form.reset();
    }, 100);
  };

  useEffect(() => {
    if (message) {
      const { messageType, toastMessage } = message as ToastMessageType;
      toastMessage !== '' &&
        toast({
          variant: messageType === 'error' ? 'destructive' : 'default',
          // title: messageType === 'error' ? messageType.toLocaleUpperCase() : '',
          description: toastMessage,
        });
    }
  }, [message, toast]);

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col justify-around w-fit"
    >
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
          onChange={handleFileChange}
        />
        <ButtonWithTooltip className="w-40" disabled={!selectedFile.length}>
          {buttonText}
        </ButtonWithTooltip>
      </div>
    </form>
  );
}