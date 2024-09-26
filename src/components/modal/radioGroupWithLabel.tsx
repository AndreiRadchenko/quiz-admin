'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  radioButtons: { [key: string]: string };
  labelLeft?: boolean;
};

export function RadioGroupWithLabel({
  fieldTitle,
  nameInSchema,
  radioButtons,
  labelLeft,
}: Props) {
  const form = useFormContext();

  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-');

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={labelLeft ? 'w-full flex items-start gap-2' : ''}>
          <FormLabel
            className={`text-base ${labelLeft ? 'w-1/4 mt-4' : ''}`}
            htmlFor={fieldTitleNoSpaces}
          >
            {fieldTitle}
          </FormLabel>
          <div
            className={`flex flex-col items-start gap-0.5 ${labelLeft ? 'w-3/4' : 'w-full max-w-xs'}`}
          >
            <div className="flex w-full">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-6"
                >
                  {Object.keys(radioButtons).map((item, idx) => (
                    <FormItem
                      key={idx}
                      // className="flex flex-row items-center gap-2 min-h-10"
                    >
                      <div className="flex items-center space-x-2 min-h-10 hover:cursor-pointer">
                        <FormControl>
                          <RadioGroupItem value={item} />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          {radioButtons[item]}
                        </FormLabel>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
