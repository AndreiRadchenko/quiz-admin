'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ShowImages } from '@/app/[lang]/quiz/question-definitions/_components/showImages';

type Props = {
  buttons: {
    [key: string]: string;
  };
};

export default function ShowImagesForm({  buttons }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <ShowImages onSelect={router.back} />
      <div className="flex gap-6 justify-start">
        <Button type="button" variant="accent" onClick={() => router.back()}>
          {buttons.cancel}
        </Button>
      </div>
    </div>
  );
}
