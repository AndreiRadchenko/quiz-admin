import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Modal } from '@/components/modal/modal';
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
    },
  } = await getDictionary(lang);

  const formTitle = replacePlaceholders(playerForm.title, { id, seat });
  const formDescription = playerForm.description;

  return (
    <Modal title={formTitle}>
      <h1>
        Modal window for edit player with id = {id}, seat = {seat}
      </h1>
      ;
    </Modal>
  );
}
