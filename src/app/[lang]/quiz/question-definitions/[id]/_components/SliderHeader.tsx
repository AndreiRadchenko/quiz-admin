import React from 'react';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Combobox } from './Combobox';

import { type Locale } from '../../../../../../../i18n-config';
import { type LabelsType, type QuestionsDataType } from '../page';

type Props = {
  locale: Locale;
  labels: LabelsType;
  data: QuestionsDataType;
};

export default function SliderHeader({ locale, labels, data }: Props) {
  return (
    <div className="relative">
      <Link
        href={'/' + locale + '/quiz/question-definitions'}
        className="absolute top-1 -left-12"
      >
        <ArrowLeft />
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex gap-5 items-center">
          <Label variant="default" size="sm" className="w-40">
            {labels.questionLabel + ':'}
          </Label>
          <Label variant="bold" size="default" className="text-accent">
            {data.label}
          </Label>
        </div>
        <div className="flex gap-5 items-center">
          <Label variant="default" size="sm" className="w-40">
            {labels.boundToNumber}
            <span className=""></span>
          </Label>
          <Combobox />
        </div>
      </div>
    </div>
  );
}
