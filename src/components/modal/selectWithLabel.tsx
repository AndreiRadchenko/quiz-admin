'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  selectItems: string[];
  placeholder?: string;
  labelLeft?: boolean;
  readOnly?: boolean;
};

export function SelectWithLabel({
  fieldTitle,
  nameInSchema,
  selectItems,
  placeholder,
  labelLeft,
  readOnly,
}: Props) {
  const form = useFormContext();

  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-');

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem
          className={labelLeft ? 'w-full flex items-baseline gap-2' : ''}
        >
          <FormLabel
            className={`text-base ${labelLeft ? 'w-1/4 mt-2' : ''}`}
            htmlFor={fieldTitleNoSpaces}
          >
            {fieldTitle}
          </FormLabel>
          <div
            className={`flex flex-col items-start gap-0.5 ${labelLeft ? 'w-3/4' : 'w-full max-w-xs'}`}
          >
            <div className="flex w-full">
              <div
                className="w-full max-w-xl flex items-center rounded-md border border-input
                  ring-offset-background focus-within:ring-2 focus-within:ring-ring
                  focus-within:ring-offset-2"
              >
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    {/* <Input
                    {...field}
                    id={fieldTitleNoSpaces}
                    className="w-full max-w-xl"
                    placeholder={placeholder || ''}
                    readOnly={readOnly}
                    disabled={readOnly}
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                  /> */}
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectItems.map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
