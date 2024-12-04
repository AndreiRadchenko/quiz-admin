'use client';

import {
  createContext,
  useReducer,
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import { getQuestionImages } from '@/actions/question';

export type MessageType = 'error' | 'warning' | 'success';
export type ToastMessageType = {
  messageType: MessageType;
  toastMessage: String;
};

export type QuestionImagesType = {
  questionImagesURL: (string | undefined)[];
};

type StateType = QuestionImagesType & {
  toastMessage: ToastMessageType;
};

const enum REDUCER_ACTION_TYPE {
  MESSAGE_ADD,
  MESSAGE_REMOVE,
  QUESTIONIMAGES_UPDATE,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: ToastMessageType | QuestionImagesType;
};

const initState: StateType = {
  toastMessage: { messageType: 'error', toastMessage: '' },
  questionImagesURL: [],
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
      console.log('QUESTIONIMAGES_UPDATE:', payload);
      const questionImagesURL =
        (payload as QuestionImagesType).questionImagesURL || [];
      return { ...state, questionImagesURL };
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

  const updateQuestionImages = useCallback((data: QuestionImagesType) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.QUESTIONIMAGES_UPDATE,
      payload: data,
    });
  }, []);

  useEffect(() => {
    //Update array of images in context on render app
    (async () => {
      const bucketImages = await getQuestionImages();
      updateQuestionImages(bucketImages as QuestionImagesType);
    })();

    //Update array of images in context on change content of bucket
    const eventSource = new EventSource('/api/s3-events');

    eventSource.onmessage = event => {
      const bucketImages = JSON.parse(event.data);
      updateQuestionImages(bucketImages);
    };

    eventSource.onerror = error => {
      console.error('SSE Error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [updateQuestionImages]);

  return { state, setToastMessage, clearToastMessage, updateQuestionImages };
};

type UseSystemStateContextType = ReturnType<typeof useSystemStateContext>;

const initContextState: UseSystemStateContextType = {
  state: initState,
  setToastMessage: (data: ToastMessageType) => {},
  clearToastMessage: () => {},
  updateQuestionImages: (data: QuestionImagesType) => {},
};

export const SystemStateContext =
  createContext<UseSystemStateContextType>(initContextState);

// type ChildrenType = {
//   children?: ReactElement | ReactElement[] | undefined;
// };

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

//   {
//   toastMessage: ToastMessageType;
//   setToastMessage: (data: ToastMessageType) => void;
//   clearToastMessage: () => void;
//   updateQuestionImages: (data: QuestionImagesType) => void,
// };

export const useSystemState = (): UseSystemStateHookType => {
  const { state, setToastMessage, clearToastMessage, updateQuestionImages } =
    useContext(SystemStateContext);
  return {
    state,
    setToastMessage,
    clearToastMessage,
    updateQuestionImages,
  };
};

export default SystemStateProvider;
