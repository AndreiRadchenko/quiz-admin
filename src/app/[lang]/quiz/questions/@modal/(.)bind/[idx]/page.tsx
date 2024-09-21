import React from 'react';

import { Modal } from '@/components/modal/modal';
// import PlayerForm from '../../../edit/[idx]/PlayerForm';
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
      questions: { bindForm },
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(bindForm.title, { idx, legend });

  return (
    <Modal
      title={formTitle}
      description={bindForm.description}
      alertConfirmationMessage={bindForm.alertConfirmationMessage}
    >
      {/* <PlayerForm
        idx={Number(idx)}
        labels={playerForm.labels}
        checkBoxes={playerForm.checkBoxes}
        buttons={playerForm.buttons}
      /> */}
      <></>
    </Modal>
  );
}
