'use client';
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { type ToastMessageType } from '@/context/SystemStateProvider';
import { IoIosImages } from 'react-icons/io';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

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
      {field === 'questionImages' && (
        <ButtonWithTooltip
          className="w-14"
          type="button"
          tooltip="Show images"
          asChild
        >
          <Link href={pathname + `/question-images`}>
            <IoIosImages size={24} />
          </Link>
        </ButtonWithTooltip>
      )}
      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="flex flex-col justify-around w-fit items-start"
      >
        <Label className="mb-1 w-fit" htmlFor="input">
          {label}
        </Label>
        <div className="flex flex-row gap-2">
          <Input
            id="input"
            type="file"
            name="file"
            className={cn(
              'w-80 placeholder:background text-inherit',
              field === 'questionImages' && 'w-64'
            )}
            accept={field === 'questionImages' ? '.png' : '.csv'}
            multiple={field === 'questionImages'}
            onChange={handleFileChange}
          />
          <ButtonWithTooltip className="w-40" disabled={!selectedFile.length}>
            {buttonText}
          </ButtonWithTooltip>
        </div>
      </form>
    </div>
  );
}
