'use server';

import { revalidatePath } from 'next/cache';
import { s3Service } from '@/services/s3Services';

const wait = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

export async function questionImages(formData: FormData) {
  const files = formData.getAll('file') as File[];

  // await wait(3000);

  await files.forEach(async file => {
    await s3Service.uploadFile(file);
  });

  revalidatePath('/');
}
