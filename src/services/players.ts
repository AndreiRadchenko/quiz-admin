'use client';

import playersData from '@/mock/playersTableTemplate.json' assert { type: 'json' };

import { createZodFetcher } from 'zod-fetch';
import { PlayerSchema, type Player } from '@/schemas/Player';

const fetchUser = createZodFetcher();

const wait = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

export async function getPlayersData() {
  await wait(500);
  return playersData;
}

export async function getPlayer(id: string) {
  // const user = await fetchUser(
  //   PlayerSchema,
  //   `http://localhost:3500/users/${id}`,
  //   { cache: 'no-store' }
  // );
  const player: Player = {
    id: Number(id),
    name: `Default Player ${id}`,
    active: false,
    usedPass: false,
    boughtOut: false,
    boughtOutEndGame: false,
  };

  return player;
}
