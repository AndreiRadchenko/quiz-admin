'use server';

import { QuestionSchema } from '@/schemas/Question';
import type { Question } from '@/schemas/Question';
import type { BindQuestion } from '@/app/[lang]/quiz/questions/bind/[idx]/bindQuestionForm';
import { S3Service } from '@/services/s3Services';
import { QuestionImagesType } from '@/context/SystemStateProvider';

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

export async function getQuestionImages() {
  try {
    const s3Service = await S3Service.getInstance();
    if (!s3Service) {
      throw new Error(
        "Can't connect to the file storage. Please start it first."
      );
    }
    const result = await s3Service.getImages();
    return result;
  } catch (error) {
    console.error('Error in questionImages:', error);

    return {
      messageType: 'error',
      toastMessage:
        (error as { message: string }).message || 'An unknown error occurred',
    };
  }
}
