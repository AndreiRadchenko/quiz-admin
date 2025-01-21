import React from 'react';

import { getDictionary } from '../../../../../dictionaries/dictionaries';
import { ImportFileForm } from '../_components/ImportFileForm';

type Props = {
  params: { lang: string };
};

export default async function BucketsPage({
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: {
      dashboard: { title, buttons = {}, inputs = {}, importFiles = {} },
    },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">{title}</h1>
      <section id="import-files" className="grid grid-cols-2 gap-6 my-12 w-fit">
        {Object.keys(importFiles)?.map((field, idx) => (
          <ImportFileForm
            key={idx}
            field={field}
            label={importFiles[field].label}
            buttonText={importFiles[field].buttonText}
          />
        ))}
      </section>
    </>
  );
}
