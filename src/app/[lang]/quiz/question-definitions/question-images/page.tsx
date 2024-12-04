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

export default async function PlayerEdit({ params: { id, lang } }: Props) {
  const {
    quiz: {
      players: { playerForm },
    },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-8">{'Show Question Images'}</h1>
      <ShowImagesForm buttons={playerForm.buttons} />
    </>
  );
}
