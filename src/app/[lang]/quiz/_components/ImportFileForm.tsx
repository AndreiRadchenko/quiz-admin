'use client';
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { type ToastMessageType } from '@/context/SystemStateProvider';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { importImages } from '@/actions/buckets';

type Props = {
  // action: (prevState: unknown, formData: FormData) => void | Promise<String>;
  // action: (state: null) => Promise<null>;
  field: string;
  label?: string;
  buttonText: string;
  tooltip: string;
};

export function ImportFileForm({
  // action,
  field,
  label,
  buttonText,
  tooltip,
}: Props) {
  const pathname = usePathname();
  const page = pathname.match(/[^/]+$/)?.[0] || '';
  const importImagesAction = async (previousState: any, formData: FormData) =>
    await importImages(formData, page);

  const { toast } = useToast();
  const [message, formAction, isPending] = useFormState(
    importImagesAction,
    null
  );
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
    <div className="flex flex-row gap-2 items-end">
      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="flex flex-col justify-around w-fit items-start"
      >
        {label && (
          <Label className="mb-1 w-fit" htmlFor="input">
            {label}
          </Label>
        )}
        <div className="flex flex-row gap-2">
          <Input
            id="input"
            type="file"
            name="file"
            className={cn(
              'w-80 placeholder:background text-inherit',
              field === 'importImages' && 'w-64'
            )}
            accept={field === 'importImages' ? '.png' : '.csv'}
            multiple={field === 'importImages'}
            onChange={handleFileChange}
          />
          <ButtonWithTooltip
            className="w-40"
            tooltip={tooltip}
            disabled={!selectedFile.length}
          >
            {buttonText}
          </ButtonWithTooltip>
        </div>
      </form>
    </div>
  );
}
