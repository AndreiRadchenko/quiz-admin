'use client';

import {
  createContext,
  useReducer,
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
  ReactNode,
} from 'react';

export type MessageType = 'error' | 'warning' | 'success';
export type ToastMessageType = {
  messageType: MessageType;
  toastMessage: String;
};

type StateType = {
  toastMessage: ToastMessageType;
};

const enum REDUCER_ACTION_TYPE {
  MESSAGE_ADD,
  MESSAGE_REMOVE,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: ToastMessageType;
};

const initState: StateType = {
  toastMessage: { messageType: 'error', toastMessage: '' },
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  const { type, payload } = action;

  switch (action.type) {
    case REDUCER_ACTION_TYPE.MESSAGE_ADD: {
      const toastMessage = {
        messageType: payload?.messageType ?? 'error',
        toastMessage: payload?.toastMessage ?? '',
      };
      return { ...state, toastMessage };
    }
    case REDUCER_ACTION_TYPE.MESSAGE_REMOVE: {
      return { ...state, toastMessage: initState.toastMessage };
    }
    default:
      throw new Error();
  }
};

const useSystemStateContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setToastMessage = useCallback(
    (data: ToastMessageType) =>
      dispatch({ type: REDUCER_ACTION_TYPE.MESSAGE_ADD, payload: data }),
    []
  );

  const clearToastMessage = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.MESSAGE_REMOVE }),
    []
  );

  return { state, setToastMessage, clearToastMessage };
};

type UseSystemStateContextType = ReturnType<typeof useSystemStateContext>;

const initContextState: UseSystemStateContextType = {
  state: initState,
  setToastMessage: (data: ToastMessageType) => {},
  clearToastMessage: () => {},
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

type UseSystemStateHookType = {
  toastMessage: ToastMessageType;
  setToastMessage: (data: ToastMessageType) => void;
  clearToastMessage: () => void;
};

export const useSystemState = (): UseSystemStateHookType => {
  const {
    state: { toastMessage },
    setToastMessage,
    clearToastMessage,
  } = useContext(SystemStateContext);
  return { toastMessage, setToastMessage, clearToastMessage };
};

export default SystemStateProvider;
