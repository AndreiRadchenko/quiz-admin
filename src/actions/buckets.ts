'use server';

import { S3Service } from '@/services/s3Services';

export async function getImages(bucket: string) {
  try {
    const questionsService = await S3Service.getInstance(bucket);
    if (!questionsService) {
      throw new Error(
        "Can't connect to the file storage. Please start it first."
      );
    }
    const result = await questionsService.getImages();
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

export async function importImages(formData: FormData, bucket: string) {
  const files = formData.getAll('file') as File[];
  let filesCount = files.length;

  try {
    const bucketService = await S3Service.getInstance(bucket);
    if (!bucketService) {
      throw new Error(
        "Can't connect to the file storage. Please start it first."
      );
    }

    await Promise.all(
      files.map(async file => {
        await bucketService.uploadFile(file);
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

export async function removeImages(files: string[], bucket: string) {
  let filesCount = files.length;

  try {
    const bucketService = await S3Service.getInstance(bucket);
    if (!bucketService) {
      throw new Error(
        "Can't connect to the file storage. Please start it first."
      );
    }

    await bucketService.removeImages(files);

    return {
      messageType: 'success',
      toastMessage:
        filesCount !== 1
          ? `${filesCount} images removed successfully`
          : 'Image removed successfully',
    };
  } catch (error) {
    console.error('Error in removeImages:', error);

    return {
      messageType: 'error',
      toastMessage:
        (error as { message: string }).message || 'An unknown error occurred',
    };
  }
}
