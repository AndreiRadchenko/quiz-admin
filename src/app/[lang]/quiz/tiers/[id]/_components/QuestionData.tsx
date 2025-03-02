import { Label } from '@/components/ui/label';
import React from 'react';

import { type LabelsType } from '../page';
import { type QuestionDataType, type TierDataType } from '@/types/dataTypes';
import { Check, X } from 'lucide-react';

type Props = {
  labels: LabelsType;
  data: QuestionDataType;
};

export default function QuestionData({ labels, data }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <Label variant="default" size="sm" className="w-auto">
          {labels.type + ':'}
        </Label>
        <Label variant="bold" size="sm" className="">
          {data.answerType}
        </Label>
      </div>
      <div className="flex gap-5 items-center">
        <Label variant="default" size="sm" className="w-auto">
          {labels.passAllowed + ':'}
          <span className=""></span>
        </Label>
        <Check size={32} className="" />
      </div>
      <div className="flex gap-5 items-center">
        <Label variant="default" size="sm" className="w-auto">
          {labels.options + ':'}
        </Label>
        <Label variant="bold" size="sm" className="">
          {data.answerOptions}
        </Label>
      </div>
      <div className="flex gap-5 items-center">
        <Label variant="default" size="sm" className="w-auto">
          {labels.answers + ':'}
        </Label>
        <Label variant="bold" size="sm" className="">
          {data.correctAnswer}
        </Label>
      </div>
    </div>
  );
}
