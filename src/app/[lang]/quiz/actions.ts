'use server';

import { revalidatePath } from 'next/cache';
import { S3Service } from '@/services/s3Services';
import { type ToastMessageType } from '@/context/SystemStateProvider';

// const wait = (duration: number) =>
//   new Promise(resolve => setTimeout(resolve, duration));

export async function importImages(prevState: unknown, formData: FormData) {
  const files = formData.getAll('file') as File[];
  let filesCount = files.length;

  // await wait(3000);
  try {
    const s3Service = await S3Service.getInstance();
    if (!s3Service) {
      throw new Error(
        "Can't connect to the file storage. Please start it first."
      );
    }

    await Promise.all(
      files.map(async file => {
        await s3Service.uploadFile(file);
      })
    );

    return {
      messageType: 'success',
      toastMessage:
        filesCount !== 1
          ? `${filesCount} images uploaded successfully`
          : 'Image uploaded successfully',
    };
  } catch (error) {
    console.error('Error in importImages:', error);

    return {
      messageType: 'error',
      toastMessage:
        (error as { message: string }).message || 'An unknown error occurred',
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

type Action = typeof importImages;
interface ImportFileActionType {
  [key: string]: Action;
}

const importFileAction: ImportFileActionType = {
  seatInfo,
  playerData,
  externalQuestionData,
  externalPlayerInfo,
  importImages,
};

export const getActions = async () => importFileAction;
