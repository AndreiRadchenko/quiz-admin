import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.number(),
  label: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  imagePath: z.string(),
  answerType: z.string(),
  answerOptions: z.string(),
  correctAnswer: z.string(),
  description: z.string(),
});

export type Question = z.infer<typeof QuestionSchema>;
