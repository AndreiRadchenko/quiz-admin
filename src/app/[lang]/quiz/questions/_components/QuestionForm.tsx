'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/modal/inputWithLabel';
import { InputWithSelect } from '@/app/[lang]/quiz/questions/_components/inputWithSelect';
import { RadioGroupWithLabel } from '@/components/modal/radioGroupWithLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlayerSchema, type Player } from '@/schemas/Player';
import { QuestionSchema, type Question } from '@/schemas/Question';
import { savePlayer } from '@/actions/player';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { saveQuestion } from '@/actions/question';
import { usePageContext } from '../_context/pageContext';

type Props = {
  id: string;
  labels: {
    [key: string]: string;
  };
  radioButtons: {
    [key: string]: string;
  };
  buttons: {
    [key: string]: string & { [key: string]: string };
  };
};

const defaultQuestion: Question = {
  id: '',
  label: '',
  imagePath: '',
  answerType: '',
  answerOptions: '',
  correctAnswer: '',
  description: '',
};

export default function QuestionForm({
  id,
  labels,
  radioButtons,
  buttons,
}: Props) {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const { pagePreferences, setPagePreferences } = usePageContext();

  const form = useForm<Question>({
    mode: 'onBlur',
    resolver: zodResolver(QuestionSchema),
    // you can debug your validation schema here
    // resolver: async (data, context, options) => {
    //
    //   console.log('formData', data);
    //   console.log(
    //     'validation result',
    //     await zodResolver(PlayerSchema)(data, context, options)
    //   );
    //   return zodResolver(PlayerSchema)(data, context, options);
    // },
    defaultValues: {
      ...defaultQuestion,
      id,
      label: `Default user ${id}`,
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      sessionStorage.setItem('formModified', 'true');
    } else {
      sessionStorage.setItem('formModified', 'false');
    }
  }, [form.formState]);

  async function onSubmit() {
    setPagePreferences({
      ...pagePreferences,
      selectedQuestionImage: '',
    });
    setMessage('');
    setErrors({});
    sessionStorage.setItem('formModified', 'false');
    /* No need to validate here because 
        react-hook-form already validates with 
        our Zod schema */
    const result = await saveQuestion(form.getValues());

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
          <div className="flex flex-col gap-0">
            {Object.keys(labels).map((key, idx) =>
              key !== 'imagePath' ? (
                key !== 'answerType' ? (
                  <InputWithLabel
                    key={idx}
                    fieldTitle={labels[key]}
                    nameInSchema={key}
                    labelLeft
                  />
                ) : (
                  <RadioGroupWithLabel
                    key={idx}
                    fieldTitle={labels[key]}
                    nameInSchema={key}
                    radioButtons={radioButtons}
                    labelLeft
                  />
                )
              ) : (
                <InputWithSelect
                  key={labels['imagePath']}
                  fieldTitle={labels['imagePath']}
                  buttonTooltip={buttons.tooltips.selectImage}
                  nameInSchema={'imagePath'}
                  labelLeft
                  modalLink={pathname.replace(/\/(edit\/\d+|\d+\/edit)$/, '')}
                />
              )
            )}
          </div>
          <div className="flex gap-6 justify-start">
            <Button type="submit">{buttons.save}</Button>
            <Button
              type="button"
              variant="accent"
              onClick={() => {
                setPagePreferences({
                  ...pagePreferences,
                  selectedQuestionImage: '',
                });
                router.back();
              }}
            >
              {buttons.cancel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
