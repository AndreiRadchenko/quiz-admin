import React from 'react';

import { Modal } from '@/components/modal/modal';
import BindQuestionForm from '../../../bind/[idx]/bindQuestionForm';
import {
  getDictionary,
  replacePlaceholders,
} from '../../../../../../../../dictionaries/dictionaries';

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
      alertConfirmationDialog,
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(bindForm.title, { idx, legend });

  return (
    <Modal
      title={formTitle}
      description={bindForm.description}
      confirmationDialog={alertConfirmationDialog}
    >
      <BindQuestionForm
        idx={idx}
        labels={bindForm.labels}
        buttons={bindForm.buttons}
      />
    </Modal>
  );
}
