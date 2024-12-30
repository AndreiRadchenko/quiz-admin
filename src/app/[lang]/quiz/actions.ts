'use server';

import { S3Service } from '@/services/s3Services';
import { config } from '@/config';

// const wait = (duration: number) =>
//   new Promise(resolve => setTimeout(resolve, duration));

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

type Action = typeof externalPlayerInfo;
interface ImportFileActionType {
  [key: string]: Action;
}

const importFileAction: ImportFileActionType = {
  seatInfo,
  playerData,
  externalQuestionData,
  externalPlayerInfo,
};

export const getActions = async () => importFileAction;
