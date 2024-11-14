'use server';

import { revalidatePath } from 'next/cache';
import { s3Service } from '@/services/s3Services';
import { type ToastMessageType } from '@/context/SystemStateProvider';

// const wait = (duration: number) =>
//   new Promise(resolve => setTimeout(resolve, duration));

export async function questionImages(prevState: unknown, formData: FormData) {
  const files = formData.getAll('file') as File[];

  // await wait(3000);
  try {
    if (!s3Service) {
      throw new Error("Can't connect to the file storage");
    }
    await files.forEach(async file => {
      await s3Service?.uploadFile(file);
    });
    return {
      messageType: 'success',
      toastMessage: 'Images uploaded successfully',
    };
  } catch (error) {
    return {
      messageType: 'error',
      toastMessage: (error as any).message,
    };
  }
}

export async function seatInfo(prevState: unknown, formData: FormData) {
  const file = formData.get('file') as File;
  try {
    throw new Error("Can't connect to the seatInfo database");

    // return {
    //   messageType: 'success',
    //   toastMessage: 'Images uploaded successfully',
    // };
  } catch (error) {
    return {
      messageType: 'error',
      toastMessage: (error as any).message,
    };
  }
}

export async function playerData(prevState: unknown, formData: FormData) {
  const file = formData.get('file') as File;
  try {
    throw new Error("Can't connect to the playerData database");

    // return {
    //   messageType: 'success',
    //   toastMessage: 'Images uploaded successfully',
    // };
  } catch (error) {
    return {
      messageType: 'error',
      toastMessage: (error as any).message,
    };
  }
}

export async function externalQuestionData(
  prevState: unknown,
  formData: FormData
) {
  const file = formData.get('file') as File;
  try {
    throw new Error("Can't connect to the externalQuestionData database");

    // return {
    //   messageType: 'success',
    //   toastMessage: 'Images uploaded successfully',
    // };
  } catch (error) {
    return {
      messageType: 'error',
      toastMessage: (error as any).message,
    };
  }
}

export async function externalPlayerInfo(
  prevState: unknown,
  formData: FormData
) {
  const file = formData.get('file') as File;
  try {
    throw new Error("Can't connect to the externalQuestionData database");

    // return {
    //   messageType: 'success',
    //   toastMessage: 'Images uploaded successfully',
    // };
  } catch (error) {
    return {
      messageType: 'error',
      toastMessage: (error as any).message,
    };
  }
}

type Action = typeof questionImages;
interface ImportFileActionType {
  [key: string]: Action;
}

const importFileAction: ImportFileActionType = {
  seatInfo,
  playerData,
  externalQuestionData,
  externalPlayerInfo,
  questionImages,
};

export const getActions = async () => importFileAction;
