import { z } from 'zod';

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  tier: z.string().optional(),
  notes: z.string().optional(),
  occupation: z.string().optional(),
  prizeSpend: z.string().optional(),
  relations: z.string().optional(),
  externalId: z.string().optional(),
  imagePath: z.string().optional(),
  active: z.boolean().optional().default(false),
  usedPass: z.boolean().optional().default(false),
  boughtOut: z.boolean().optional().default(false),
  boughtOutEndGame: z.boolean().optional().default(false),
});

export type Player = z.infer<typeof PlayerSchema>;
