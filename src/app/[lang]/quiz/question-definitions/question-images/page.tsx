import React from 'react';

import ShowImagesForm from './ShowImagesForm';
import {
  getDictionary,
  replacePlaceholders,
} from '../../../../../../dictionaries/dictionaries';

type Props = {
  params: {
    id: number;
    lang: string;
  };
  searchParams: { seat: string };
};

export default async function PlayerEdit({
  params: { id, lang },
  searchParams: { seat },
}: Props) {
  const {
    quiz: {
      players: { playerForm },
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(playerForm.title, { id, seat });

  return (
    <>
      <h1 className="mb-8">{'Show Question Images'}</h1>
      <ShowImagesForm
        id={Number(id)}
        labels={playerForm.labels}
        checkBoxes={playerForm.checkBoxes}
        buttons={playerForm.buttons}
      />
    </>
  );
}
