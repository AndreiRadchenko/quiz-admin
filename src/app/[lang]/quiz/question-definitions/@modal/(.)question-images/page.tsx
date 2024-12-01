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

export default async function QuestionImages({
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
    <Modal
      title={'Select question image'}
      alertConfirmationMessage={playerForm.alertConfirmationMessage}
    >
      <ShowImagesForm
        id={Number(id)}
        labels={playerForm.labels}
        checkBoxes={playerForm.checkBoxes}
        buttons={playerForm.buttons}
      />
    </Modal>
  );
}
