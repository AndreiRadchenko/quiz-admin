import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dispatch, SetStateAction, useState } from 'react';

export type FilterValue = 'active' | 'passes' | 'all';

type FilterProps = {
  filter: { all: FilterValue; active: FilterValue; passes: FilterValue };
  setFilterValue: Dispatch<SetStateAction<FilterValue>>;
};

export function FilterRadioGroup({ filter, setFilterValue }: FilterProps) {
  return (
    <RadioGroup
      defaultValue="all"
      onValueChange={value => {
        setFilterValue(value as FilterValue);
        console.log('RadioGroup: ', value);
      }}
      className="flex flex-row min-h-10"
    >
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <RadioGroupItem value="all" id="r1" />
        <Label htmlFor="r1" className="hover:cursor-pointer">
          {filter.all}
        </Label>
      </div>
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <RadioGroupItem value="active" id="r2" />
        <Label htmlFor="r2" className="hover:cursor-pointer">
          {filter.active}
        </Label>
      </div>
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <RadioGroupItem value="passes" id="r3" />
        <Label htmlFor="r3" className="hover:cursor-pointer">
          {filter.passes}
        </Label>
      </div>
    </RadioGroup>
  );
}
