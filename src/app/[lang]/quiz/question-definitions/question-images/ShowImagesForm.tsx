'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ShowImages } from '@/app/[lang]/quiz/question-definitions/_components/showImages';

type Props = {
  buttons: {
    [key: string]: string;
  };
};

export default function ShowImagesForm({ buttons }: Props) {
  const router = useRouter();

  const form = useForm({
    mode: 'onBlur',
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8">
        <ShowImages onSelect={router.back} />
        <div className="flex gap-6 justify-start">
          <Button type="button" variant="accent" onClick={() => router.back()}>
            {buttons.cancel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
