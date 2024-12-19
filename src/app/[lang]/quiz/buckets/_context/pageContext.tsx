'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useCallback,
} from 'react';

import { type BucketsType } from '../../../../../../dictionaries/dictionaries';
import { useSystemState } from '@/context/SystemStateProvider';

export type StateType = {
  selectedQuestionImages: string[];
  selectedPlayerImages: string[];
};

const enum REDUCER_ACTION_TYPE {
  QUESTION_SELECT,
  QUESTION_DESELECT,
  QUESTION_SELECT_ALL,
  QUESTION_DESELECT_ALL,
  PLAYER_SELECT,
  PLAYER_DESELECT,
  PLAYER_SELECT_ALL,
  PLAYER_DESELECT_ALL,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string[];
};

const initState: StateType = {
  selectedQuestionImages: [],
  selectedPlayerImages: [],
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  const { type, payload } = action;

  switch (action.type) {
    case REDUCER_ACTION_TYPE.QUESTION_SELECT: {
      return {
        ...state,
        selectedQuestionImages: [...state.selectedQuestionImages, payload![0]],
      };
    }
    case REDUCER_ACTION_TYPE.QUESTION_DESELECT: {
      const idx = state.selectedQuestionImages.indexOf(payload![0]);
      idx !== -1 && state.selectedQuestionImages.splice(idx, 1);
      return {
        ...state,
        selectedQuestionImages: state.selectedQuestionImages,
      };
    }
    case REDUCER_ACTION_TYPE.QUESTION_SELECT_ALL: {
      return {
        ...state,
        selectedQuestionImages: payload!,
      };
    }
    case REDUCER_ACTION_TYPE.QUESTION_DESELECT_ALL: {
      return {
        ...state,
        selectedQuestionImages: [],
      };
    }
    default:
      throw new Error();
  }
};

const usePageStateContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    state: { questionImages },
  } = useSystemState();

  const selectQuestion = useCallback(
    (data: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.QUESTION_SELECT,
        payload: [data],
      }),
    []
  );

  const deselectQuestion = useCallback(
    (data: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.QUESTION_DESELECT,
        payload: [data],
      }),
    []
  );

  const selectAllQuestions = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.QUESTION_SELECT_ALL,
      payload: questionImages.map(e => e.name) as string[],
    });
  }, [questionImages]);

  const deselectAllQuestions = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.QUESTION_DESELECT_ALL,
      payload: [],
    });
  }, []);

  return {
    state,
    selectQuestion,
    deselectQuestion,
    selectAllQuestions,
    deselectAllQuestions,
  };
};

type PageContextType = ReturnType<typeof usePageStateContext> & {
  bucketsLocale: BucketsType;
};

const initContextState: PageContextType = {
  bucketsLocale: {},
  state: initState,
  selectQuestion: (data: string) => {},
  deselectQuestion: (data: string) => {},
  selectAllQuestions: () => {},
  deselectAllQuestions: () => {},
};

const PageContext = createContext<PageContextType>(initContextState);

export default function PageContextProvider({
  children,
  bucketsLocale,
}: {
  children: ReactNode;
  bucketsLocale: BucketsType;
}) {
  return (
    <PageContext.Provider
      value={{ bucketsLocale, ...usePageStateContext(initState) }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
