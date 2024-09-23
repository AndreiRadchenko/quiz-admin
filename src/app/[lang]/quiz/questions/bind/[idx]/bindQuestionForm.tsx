'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/modal/inputWithLabel';
import { CheckboxWithLabel } from '@/components/modal/checkboxWithLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlayerSchema, type Player } from '@/schemas/Player';
import { savePlayer } from '@/actions/player';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveQuestionBinding } from '@/actions/question';
import { SelectWithLabel } from '@/components/modal/selectWithLabel';

const questions = Array.from({ length: 10 }, (_, i) => {
  const label = i <= 8 ? `A0${i + 1}` : `A${i + 1}`;
  const description = 'Description for question ' + label;
  return {
    label,
    description,
  };
});

export type BindQuestion = {
  idx: string;
  question: string;
};

type Props = {
  idx: string;
  labels: {
    [key: string]: string;
  };
  buttons: {
    [key: string]: string;
  };
};

export default function BindQuestionForm({ idx, labels, buttons }: Props) {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const form = useForm<BindQuestion>({
    mode: 'onBlur',
    // resolver: zodResolver(PlayerSchema),
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   console.log('formData', data);
    //   console.log(
    //     'validation result',
    //     await zodResolver(PlayerSchema)(data, context, options)
    //   );
    //   return zodResolver(PlayerSchema)(data, context, options);
    // },
    defaultValues: {
      idx: '1',
      question: questions[3].label,
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      localStorage.setItem('bindQuestionFormModified', 'true');
    } else {
      localStorage.setItem('bindQuestionFormModified', 'false');
    }
  }, [form.formState]);

  async function onSubmit() {
    setMessage('');
    setErrors({});
    /* No need to validate here because 
        react-hook-form already validates with 
        our Zod schema */
    const result = await saveQuestionBinding(form.getValues());

    if (result?.errors) {
      setMessage(result.message);
      setErrors(result.errors);
      return;
    } else {
      // setMessage(result.message);
      router.refresh(); // could grab a new timestamp from db
      // reset dirty fields
      form.reset(form.getValues());
      router.back();
    }
  }

  return (
    <div>
      {message ? <h2 className="text-2xl">{message}</h2> : null}

      {errors ? (
        <div className="text-red-500">
          {Object.keys(errors).map(key => (
            <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>
          ))}
        </div>
      ) : null}

      <Form {...form}>
        <form
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
          className="flex flex-col gap-8"
        >
          <SelectWithLabel
            fieldTitle={labels.selectQuestion}
            nameInSchema="question"
            selectItems={questions.map(q => `${q.label}, ${q.description}`)}
            labelLeft
          />
          <div className="flex gap-6 justify-start">
            <Button type="submit">{buttons.save}</Button>
            <Button
              type="button"
              variant="accent"
              onClick={() => router.back()}
            >
              {buttons.cancel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
