import React from 'react';

import { Label } from '@/components/ui/label';
import { Combobox } from '@/app/[lang]/quiz/tiers/_components/Combobox';

import { type Locale } from '../../../../../../../i18n-config';
import { type LabelsType } from '../page';
import { type QuestionDataType, type TierDataType } from '@/types/dataTypes';

type Props = {
  locale: Locale;
  labels: LabelsType;
  data: QuestionDataType & {
    idx: string;
    legend: string;
    boundQuestion: string;
  };
};

export default function SliderHeader({ locale, labels, data }: Props) {
  return (
    <div className="flex flex-row gap-5 flex-grow">
      <div className="flex flex-col gap-3">
        <div className="flex gap-5 items-center">
          <Label variant="default" size="sm" className="w-40">
            {labels.questionLabel + ':'}
          </Label>
          <Label variant="bold" size="default" className="text-accent">
            {data.legend + '  ( ' + data.idx + ' )'}
          </Label>
        </div>
        <div className="flex gap-5 items-center">
          <Label variant="default" size="sm" className="w-40">
            {labels.boundToNumber + ':'}
            <span className=""></span>
          </Label>
          <Combobox idx={data.idx} isInput boundQuestion={data.boundQuestion} />
        </div>
      </div>
    </div>
  );
}
