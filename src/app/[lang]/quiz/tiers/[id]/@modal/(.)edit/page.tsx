import React from 'react';

import { Modal } from '@/components/modal/modal';
import QuestionForm from '../../../_components/QuestionForm';
import {
  getDictionary,
  replacePlaceholders,
} from '../../../../../../../../dictionaries/dictionaries';

type Props = {
  params: {
    id: string;
    lang: string;
  };
};

export default async function QuestionEdit({ params: { id, lang } }: Props) {
  const {
    quiz: {
      questionBank: { questionForm },
      alertConfirmationDialog,
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(questionForm.title, {
    id,
    seat: '22',
  });

  return (
    <Modal
      title={formTitle}
      confirmationDialog={alertConfirmationDialog}
      backUrl={'/' + lang + '/quiz/questions'}
    >
      <QuestionForm
        id={id}
        labels={questionForm.labels}
        radioButtons={questionForm.radioButtons}
        buttons={questionForm.buttons}
      />
    </Modal>
  );
}
