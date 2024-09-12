'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  params: {
    id: number;
  };
};

export default function PlayerEdit({ params: { id } }: Props) {
  const query = useSearchParams();
  const seat = query.get('seat');
  return (
    <h1>
      Edit player with id = {id}, seat = {seat}
    </h1>
  );
}
