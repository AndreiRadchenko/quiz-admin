import React from 'react';

import QuestionForm from './QuestionForm';
import {
  getDictionary,
  replacePlaceholders,
} from '../../../../../../../dictionaries/dictionaries';

type Props = {
  params: {
    id: string;
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
      questionDefinitions: { questionForm },
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(questionForm.title, { id, seat });

  return (
    <>
      <h1 className="mb-8">{formTitle}</h1>
      <QuestionForm
        id={id}
        labels={questionForm.labels}
        radioButtons={questionForm.radioButtons}
        buttons={questionForm.buttons}
      />
    </>
  );
}
