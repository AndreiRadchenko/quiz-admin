'use client';

import * as Minio from 'minio';

import {
  createContext,
  useReducer,
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { getImages } from '@/actions/buckets';
import { config } from '@/config';

export type MessageType = 'error' | 'warning' | 'success';
export type ToastMessageType = {
  messageType: MessageType;
  toastMessage: String;
};

type StateType = {
  toastMessage: ToastMessageType;
  questionImages: Minio.BucketItem[];
  playerImages: Minio.BucketItem[];
};

const enum REDUCER_ACTION_TYPE {
  MESSAGE_ADD,
  MESSAGE_REMOVE,
  QUESTIONIMAGES_UPDATE,
  PLAYERIMAGES_UPDATE,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: ToastMessageType | Minio.BucketItem[];
};

const initState: StateType = {
  toastMessage: { messageType: 'error', toastMessage: '' },
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

const reducer = (state: StateType, action: ReducerAction): StateType => {
  const { type, payload } = action;

  switch (action.type) {
    case REDUCER_ACTION_TYPE.MESSAGE_ADD: {
      const toastMessage = {
        messageType: (payload as ToastMessageType).messageType ?? 'error',
        toastMessage: (payload as ToastMessageType).toastMessage ?? '',
      };
      return { ...state, toastMessage };
    }
    case REDUCER_ACTION_TYPE.MESSAGE_REMOVE: {
      return { ...state, toastMessage: initState.toastMessage };
    }
    case REDUCER_ACTION_TYPE.QUESTIONIMAGES_UPDATE: {
      const images = payload as Minio.BucketItem[];
      const questionImages = images || [];
      return { ...state, questionImages };
    }
    case REDUCER_ACTION_TYPE.PLAYERIMAGES_UPDATE: {
      const images = payload as Minio.BucketItem[];
      const playerImages = images || [];
      return { ...state, playerImages };
    }
    default:
      throw new Error();
  }
};

const useSystemStateContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setToastMessage = useCallback(
    (data: ToastMessageType) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.MESSAGE_ADD,
        payload: data,
      }),
    []
  );

  const clearToastMessage = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.MESSAGE_REMOVE }),
    []
  );

  const updateQuestionImages = useCallback((data: Minio.BucketItem[]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.QUESTIONIMAGES_UPDATE,
      payload: data,
    });
  }, []);

  const updatePlayerImages = useCallback((data: Minio.BucketItem[]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.PLAYERIMAGES_UPDATE,
      payload: data,
    });
  }, []);

  useEffect(() => {
    //Update array of images in context on render app
    (async () => {
      const questionImages = await getImages(config.S3_BUCKET_QUESTIONS);
      const playerImages = await getImages(config.S3_BUCKET_PLAYERS);
      updateQuestionImages(questionImages as Minio.BucketItem[]);
      updatePlayerImages(playerImages as Minio.BucketItem[]);
    })();

    //Update array of images in context on change content of bucket
    const eventSource = new EventSource('/api/s3-events');

    eventSource.onmessage = event => {
      const { bucket, images } = JSON.parse(event.data);
      // console.log('bucket, images: ', bucket, images);
      const bucketImagesWithDate = (images as Minio.BucketItem[]).map(e => ({
        ...e,
        lastModified: new Date(e.lastModified as Date),
      }));
      switch (bucket) {
        case config.S3_BUCKET_QUESTIONS:
          updateQuestionImages(bucketImagesWithDate as Minio.BucketItem[]);
          break;
        case config.S3_BUCKET_PLAYERS:
          updatePlayerImages(bucketImagesWithDate as Minio.BucketItem[]);
          break;
        default:
          break;
      }
    };

    eventSource.onerror = error => {
      console.error('SSE Error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [updateQuestionImages, updatePlayerImages]);

  return {
    state,
    setToastMessage,
    clearToastMessage,
    updateQuestionImages,
    updatePlayerImages,
  };
};

type UseSystemStateContextType = ReturnType<typeof useSystemStateContext>;

const initContextState: UseSystemStateContextType = {
  state: initState,
  setToastMessage: (data: ToastMessageType) => {},
  clearToastMessage: () => {},
  updateQuestionImages: (data: Minio.BucketItem[]) => {},
  updatePlayerImages: (data: Minio.BucketItem[]) => {},
};

export const SystemStateContext =
  createContext<UseSystemStateContextType>(initContextState);

export const SystemStateProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <SystemStateContext.Provider value={useSystemStateContext(initState)}>
      {children}
    </SystemStateContext.Provider>
  );
};

type UseSystemStateHookType = typeof initContextState;

export const useSystemState = (): UseSystemStateHookType => {
  const {
    state,
    setToastMessage,
    clearToastMessage,
    updateQuestionImages,
    updatePlayerImages,
  } = useContext(SystemStateContext);
  return {
    state,
    setToastMessage,
    clearToastMessage,
    updateQuestionImages,
    updatePlayerImages,
  };
};

export default SystemStateProvider;
