import React from 'react';

import { Button } from '@/components/ui/button';
import { getDictionary } from '../../../../dictionaries/dictionaries';
import { Input } from '@/components/ui/input';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { ImportFileForm } from './_components/ImportFileForm';

import { importImages, getActions } from './actions';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizDashboard({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: {
      dashboard: { title, buttons = {}, inputs = {}, importFiles = {} },
    },
  } = await getDictionary(lang);

  const importFileActions = await getActions();

  return (
    <>
      <h1 className="mb-6">{title}</h1>
      <section id="buttons" className="flex flex-col gap-8 my-12">
        {Object.keys(buttons)?.map(key => (
          <ul key={key} className="flex flex-row gap-4">
            {Object.keys(buttons[key])?.map(button => (
              <li key={button} className="">
                <Button variant={'default'}>{buttons[key][button]}</Button>
              </li>
            ))}
          </ul>
        ))}
      </section>
      <section id="inputs" className="flex flex-row gap-6 justify-start my-12">
        {Object.keys(inputs)?.map((key, idx) => (
          <div key={idx} className="flex flex-row gap-2">
            <Input type="number" defaultValue={0} className="w-24" />
            <ButtonWithTooltip tooltip={inputs[key].tooltip}>
              {inputs[key].buttonText}
            </ButtonWithTooltip>
          </div>
        ))}
      </section>
      <section id="import-files" className="grid grid-cols-2 gap-6 my-12 w-fit">
        {Object.keys(importFiles)?.map((field, idx) => (
          <ImportFileForm
            key={idx}
            action={importFileActions[field]}
            field={field}
            label={importFiles[field].label}
            buttonText={importFiles[field].buttonText}
          />
        ))}
      </section>
    </>
  );
}
