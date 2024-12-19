import React from 'react';

import { Button } from '@/components/ui/button';
import { getDictionary } from '../../../../../dictionaries/dictionaries';
import { Input } from '@/components/ui/input';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';

import { getActions } from '../actions';
import { ImportFileForm } from '../_components/ImportFileForm';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function BucketsPage({
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
