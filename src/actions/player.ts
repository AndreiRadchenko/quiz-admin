'use server';

import { PlayerSchema } from '@/schemas/Player';
import type { Player } from '@/schemas/Player';

type ReturnType = {
  message: string;
  errors?: Record<string, unknown>;
};

export async function savePlayer(Player: Player): Promise<ReturnType> {
  // Test errors:
  Player.name = 'D';

  const parsed = PlayerSchema.safeParse(Player);

  if (!parsed.success) {
    return {
      message: 'Submission Failed',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // await fetch(`http://localhost:3500/Players/${Player.id}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     firstname: Player.firstname,
  //     lastname: Player.lastname,
  //     email: Player.email,
  //   }),
  // });

  return { message: 'Player Updated! 🎉' };
}
