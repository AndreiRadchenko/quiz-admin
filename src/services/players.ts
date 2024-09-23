import { createZodFetcher } from 'zod-fetch';
import { PlayerSchema, type Player } from '@/schemas/Player';

const fetchUser = createZodFetcher();

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

export async function getPlayers() {
  // const users = await fetchUsers(
  //   z.array(UserSchema),
  //   'http://localhost:3500/users',
  //   { cache: 'no-store' }
  // );
  // return users;
}
