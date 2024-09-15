'use client';

import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type Props = {
  label: string;
  nameInSchema: string;
};

export function CheckboxWithLabel({ label, nameInSchema }: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2">
          <FormLabel className={'text-base mt-2'} htmlFor={nameInSchema}>
            {label}
          </FormLabel>
          <div
            className="flex items-center rounded-md border border-input ring-offset-background
              focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          >
            <FormControl>
              <Checkbox
                {...field}
                id={nameInSchema}
                checked={field.value}
                onCheckedChange={checked => field.onChange(checked)}
              />
            </FormControl>
          </div>

          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}
