import React from 'react';

// import PlayerForm from '../../../edit/[idx]/PlayerForm';
import {
  getDictionary,
  replacePlaceholders,
} from '../../../../../../../dictionaries/dictionaries';

type Props = {
  params: {
    idx: string;
    lang: string;
  };
  searchParams: { legend: string };
};

export default async function BindQuestion({
  params: { idx, lang },
  searchParams: { legend },
}: Props) {
  const {
    quiz: {
      quizTiers: { bindForm },
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(bindForm.title, { idx, legend });

  return (
    <>
      <h1 className="mb-8">{formTitle}</h1>
      {/* <PlayerForm
        idx={Number(idx)}
        labels={playerForm.labels}
        checkBoxes={playerForm.checkBoxes}
        buttons={playerForm.buttons}
      /> */}
    </>
  );
}
