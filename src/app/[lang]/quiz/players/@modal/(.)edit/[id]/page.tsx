import React from 'react';
import { Modal } from '@/components/modal/modal';

type Props = {
  params: {
    id: number;
  };
};

export default function PlayerEdit({ params: { id } }: Props) {
  return (
    <Modal>
      <h1>Modal window for edit player with id = {id}</h1>;
    </Modal>
  );
}
