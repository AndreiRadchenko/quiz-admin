'use server';

import { QuestionSchema } from '@/schemas/Question';
import type { Question } from '@/schemas/Question';
import type { BindQuestion } from '@/app/[lang]/quiz/questions/bind/[idx]/bindQuestionForm';

type ReturnType = {
  message: string;
  errors?: Record<string, unknown>;
};

export async function saveQuestion(question: Question): Promise<ReturnType> {
  // Test errors:
  // player.name = 'D';

  // const parsed = QuestionSchema.safeParse(question);

  // if (!parsed.success) {
  //   return {
  //     message: 'Submission Failed',
  //     errors: parsed.error.flatten().fieldErrors,
  //   };
  // }

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

  return { message: 'Question saved! 🎉' };
}

export async function saveQuestionBinding(
  question: BindQuestion
): Promise<ReturnType> {
  // Test errors:
  // player.name = 'D';

  // const parsed = QuestionSchema.safeParse(question);

  // if (!parsed.success) {
  //   return {
  //     message: 'Submission Failed',
  //     errors: parsed.error.flatten().fieldErrors,
  //   };
  // }

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

  return { message: 'Question binded! 🎉' };
}
