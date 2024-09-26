import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  label: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  imagePath: z.string().optional(),
  answerType: z.string().optional(),
  answerOptions: z.string().optional(),
  correctAnswer: z.string().optional(),
  description: z.string().optional(),
});

export type Question = z.infer<typeof QuestionSchema>;
