import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import * as Minio from 'minio';

import {
  type ImagesStateType,
  type ImagesStoreType,
  questionImagesSlice,
} from './imagesSlice';
import { getImages } from '@/actions/buckets';
import { config } from '@/config';

export type AppStoreType = ImagesStoreType;

export const initAppStore = async (): Promise<ImagesStateType> => {
  try {
    const questionImages = await getImages(config.S3_BUCKET_QUESTIONS);
    const playerImages = await getImages(config.S3_BUCKET_PLAYERS);
    return {
      questionImages: questionImages as Minio.BucketItem[],
      playerImages: playerImages as Minio.BucketItem[],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      questionImages: [],
      playerImages: [],
    };
  }
};

export const createAppStore = (initStore: Promise<ImagesStateType>) => {
  const store = createStore<AppStoreType>()(
    devtools(questionImagesSlice, {
      enabled: true,
      name: '1% Store',
    })
  );
  initStore.then(store.setState);
  return store;
};
