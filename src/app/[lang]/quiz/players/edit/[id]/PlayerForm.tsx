'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/modal/inputWithLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlayerSchema, type Player } from '@/schemas/Player';
import { savePlayer } from '@/actions/player';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  player: Player;
};

export default function PlayerForm({ title, player }: Props) {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const form = useForm<Player>({
    mode: 'onBlur',
    resolver: zodResolver(PlayerSchema),
    defaultValues: { ...player },
  });

  useEffect(() => {
    // boolean value to indicate form has not been saved
    localStorage.setItem('userFormModified', form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

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
      setMessage(result.message);
      router.refresh(); // could grab a new timestamp from db
      // reset dirty fields
      form.reset(form.getValues());
    }
  }

  return (
    <div>
      {message ? <h2 className="text-2xl">{message}</h2> : null}

      {errors ? (
        <div className="mb-10 text-red-500">
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
          className="flex flex-col gap-4"
        >
          <InputWithLabel fieldTitle="First Name" nameInSchema="firstname" />
          <InputWithLabel fieldTitle="Last Name" nameInSchema="lastname" />
          <InputWithLabel fieldTitle="Email" nameInSchema="email" />
          <div className="flex gap-4">
            <Button>Submit</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
