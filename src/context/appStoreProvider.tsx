'use client';

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useStore } from 'zustand';
import * as Minio from 'minio';
import { config } from '@/config';

import {
  type AppStoreType,
  createAppStore,
  initAppStore,
} from '@/stores/appStore';

export type applicationStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<applicationStoreApi | undefined>(
  undefined
);

export interface AppStoreProviderProps {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const [store, setStore] = useState<applicationStoreApi | null>(null);

  useEffect(() => {
    initAppStore().then(initialState => {
      setStore(createAppStore(Promise.resolve(initialState))); // Ensure state is fully loaded
    });
  }, []);

  useEffect(() => {
    //Update array of images in the store on change content of bucket
    const eventSource = new EventSource('/api');

    eventSource.onmessage = event => {
      try {
        const { bucket, images } = JSON.parse(event.data);
        // Convert lastModified to Date objects
        const bucketImagesWithDate = (images as Minio.BucketItem[]).map(e => ({
          ...e,
          lastModified: new Date(e.lastModified as Date),
        }));
        // Update Zustand store based on the bucket type
        switch (bucket) {
          case config.S3_BUCKET_QUESTIONS:
            store?.setState(state => ({
              ...state,
              questionImages: bucketImagesWithDate as Minio.BucketItem[],
            }));
            break;
          case config.S3_BUCKET_PLAYERS:
            store?.setState(state => ({
              ...state,
              playerImages: bucketImagesWithDate as Minio.BucketItem[],
            }));
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error processing SSE message:', error);
      }
    };
    eventSource.onerror = error => {
      console.error('SSE Error:', error);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [store]);

  if (!store) return null; // Avoid rendering until store is ready

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStoreType) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useAppStore must be used within AppStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};

export default AppStoreProvider;
