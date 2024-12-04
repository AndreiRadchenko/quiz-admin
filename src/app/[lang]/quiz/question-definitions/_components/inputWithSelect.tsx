'use client';

import { ChangeEvent } from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import Link from 'next/link';
import { IoIosImages } from 'react-icons/io';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ButtonWithTooltip } from '../../../../../components/ui/buttonWithTooltip';

import { usePageContext } from '../_context/pageContext';

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  placeholder?: string;
  labelLeft?: boolean;
  readOnly?: boolean;
  modalLink: string;
  buttonTooltip: string;
};

export function InputWithSelect({
  fieldTitle,
  nameInSchema,
  placeholder,
  labelLeft,
  readOnly,
  modalLink,
  buttonTooltip,
}: Props) {
  const form = useFormContext();
  const { pagePreferences, setPagePreferences } = usePageContext();

  const { selectedQuestionImage } = pagePreferences;

  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-');

  const setFieldValue = (fieldValue: any) => {
    fieldValue =
      selectedQuestionImage === '' ? fieldValue : selectedQuestionImage;
    return fieldValue;
  };

  const onChangeFieldValue = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    if (selectedQuestionImage !== '') {
      setPagePreferences({
        ...pagePreferences,
        selectedQuestionImage: '',
      });
    }
    field.onChange(e.target.value);
  };

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
              <ButtonWithTooltip
                className="w-14 mr-2"
                type="button"
                tooltip={buttonTooltip}
                asChild
              >
                <Link href={modalLink + `/question-images`}>
                  <IoIosImages size={24} />
                </Link>
              </ButtonWithTooltip>
              <div
                className="w-full max-w-lg flex items-center rounded-md border border-input
                  ring-offset-background focus-within:ring-2 focus-within:ring-ring
                  focus-within:ring-offset-2"
              >
                <FormControl>
                  <Input
                    {...field}
                    id={fieldTitleNoSpaces}
                    className="w-full max-w-xl"
                    placeholder={placeholder || ''}
                    readOnly={readOnly}
                    disabled={readOnly}
                    value={setFieldValue(field.value)}
                    onChange={e => onChangeFieldValue(e, field)}
                  />
                </FormControl>
              </div>
              {!readOnly ? (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Clear"
                  title="Clear"
                  className="rounded-mdl grid place-content-center hover:bg-transparent text-red-500
                    hover:text-rose-400"
                  onClick={e => {
                    e.preventDefault();
                    setPagePreferences({
                      ...pagePreferences,
                      selectedQuestionImage: '',
                    });
                    form.setValue(nameInSchema, '', { shouldDirty: true });
                  }}
                >
                  <XIcon className="h-6 w-6 p-0 m-0" />
                </Button>
              ) : null}
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
