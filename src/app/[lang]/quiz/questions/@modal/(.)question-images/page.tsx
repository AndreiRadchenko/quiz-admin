import React from 'react';

import { Modal } from '@/components/modal/modal';
import ShowImagesForm from '../../question-images/ShowImagesForm';
import {
  getDictionary,
  replacePlaceholders,
} from '../../../../../../../dictionaries/dictionaries';

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
      alertConfirmationDialog,
    },
  } = await getDictionary(lang);

  return (
    <Modal
      title={showImagesForm.title}
      confirmationDialog={alertConfirmationDialog}
    >
      <ShowImagesForm buttons={showImagesForm.buttons} />
    </Modal>
  );
}
