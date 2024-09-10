import React from 'react';

type Props = {
  params: {
    id: number;
  };
};

export default function PlayerEdit({ params: { id } }: Props) {
  return <h1>Edit player with id = {id}</h1>;
}
