import React from 'react';

import ShowImagesForm from './ShowImagesForm';
import { getDictionary } from '../../../../../../dictionaries/dictionaries';

type Props = {
  params: {
    id: number;
    lang: string;
  };
  searchParams: { seat: string };
};

export default async function QuestionImages({ params: { id, lang } }: Props) {
  const {
    quiz: {
      questionBank: { showImagesForm },
    },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-8">{showImagesForm.title}</h1>
      <ShowImagesForm buttons={showImagesForm.buttons} />
    </>
  );
}
