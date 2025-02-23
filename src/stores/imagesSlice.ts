import { StateCreator } from 'zustand';
import * as Minio from 'minio';

export type ImagesStateType = {
  questionImages: Minio.BucketItem[];
  playerImages: Minio.BucketItem[];
};

export type ImagesActionType = {
  updateQuestionImages: (data: Minio.BucketItem[]) => void;
  updatePlayerImages: (data: Minio.BucketItem[]) => void;
};

export type ImagesStoreType = ImagesStateType & ImagesActionType;

const initState: ImagesStateType = {
  questionImages: [
    {
      name: 'init1.img',
      size: 10,
      etag: '',
      lastModified: new Date('1995-12-17T03:24:00'),
    },
  ],
  playerImages: [
    {
      name: 'init2.img',
      size: 10,
      etag: '',
      lastModified: new Date('1995-12-17T03:24:10'),
    },
  ],
};

export const questionImagesSlice: StateCreator<
  ImagesStoreType,
  [['zustand/devtools', unknown]]
> = (set, get) => ({
  ...initState,

  updateQuestionImages: (data: Minio.BucketItem[]) =>
    set(state => {
      const questionImages = data || [];
      return { ...state, questionImages };
    }),

  updatePlayerImages: (data: Minio.BucketItem[]) =>
    set(state => {
      const playerImages = data || [];
      return { ...state, playerImages };
    }),
});
