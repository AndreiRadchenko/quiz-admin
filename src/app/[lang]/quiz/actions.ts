'use server';

import fs from 'fs/promises';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function questionImages(formData: FormData) {
  // const files = formData.get('files') as File;
  const files = formData.getAll('file') as File[];

  console.log('files: ', files);
  await fs.mkdir('public/images', { recursive: true });

  files.forEach(async file => {
    await fs.writeFile(
      `./public/images/question${file.name}`,
      Buffer.from(await file.arrayBuffer())
    );
  });

  revalidatePath('/');
}
