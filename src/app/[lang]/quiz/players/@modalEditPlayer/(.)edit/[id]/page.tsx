import React from 'react';

import { Modal } from '@/components/modal/modal';
import PlayerForm from '../../../edit/[id]/PlayerForm';
import {
  getDictionary,
  replacePlaceholders,
} from '../../../../../../../../dictionaries/dictionaries';

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
      alertConfirmationDialog,
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(playerForm.title, { id, seat });

  return (
    <Modal title={formTitle} confirmationDialog={alertConfirmationDialog}>
      <PlayerForm
        id={Number(id)}
        labels={playerForm.labels}
        checkBoxes={playerForm.checkBoxes}
        buttons={playerForm.buttons}
      />
    </Modal>
  );
}
