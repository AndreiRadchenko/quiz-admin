import { Label } from '@/components/ui/label';
import React from 'react';

import { type LabelsType, type QuestionsDataType } from '../page';
import { Check, X } from 'lucide-react';

type Props = {
  labels: LabelsType;
  data: QuestionsDataType;
};

export default function QuestionData({ labels, data }: Props) {
  return (
    <div className="flex flex-row gap-10">
      <div className="flex gap-5 items-center">
        <Label variant="default" size="sm" className="w-auto">
          {labels.type + ':'}
        </Label>
        <Label variant="bold" size="sm" className="">
          --Answer Type--
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
          --Answer Options--
        </Label>
      </div>
      <div className="flex gap-5 items-center">
        <Label variant="default" size="sm" className="w-auto">
          {labels.answers + ':'}
        </Label>
        <Label variant="bold" size="sm" className="">
          --Correct Answer--
        </Label>
      </div>
    </div>
  );
}
