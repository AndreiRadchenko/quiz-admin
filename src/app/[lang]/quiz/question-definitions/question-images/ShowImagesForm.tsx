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

type Props = {
  id: number;
  labels: {
    [key: string]: string;
  };
  checkBoxes: {
    [key: string]: string;
  };
  buttons: {
    [key: string]: string;
  };
};

const defaultUser: Player = {
  id: 0,
  name: 'default user',
  tier: '',
  notes: '',
  occupation: '',
  prizeSpend: '',
  relations: '',
  externalId: '',
  imagePath: '',
  active: true,
  usedPass: false,
  boughtOut: false,
  boughtOutEndGame: false,
};

export default function ShowImagesForm({
  id,
  labels,
  checkBoxes,
  buttons,
}: Props) {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const form = useForm<Player>({
    mode: 'onBlur',
    resolver: zodResolver(PlayerSchema),
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
      ...defaultUser,
      id,
      name: `Default user ${id}`,
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
    setMessage('');
    setErrors({});
    /* No need to validate here because 
        react-hook-form already validates with 
        our Zod schema */
    const result = await savePlayer(form.getValues());

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
      {message ? <h2 className="text-2xl">{'Select question image'}</h2> : null}

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
