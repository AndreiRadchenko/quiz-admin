'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useCallback,
} from 'react';

import { type BucketsType } from '../../../../../../dictionaries/dictionaries';
import { useAppStore } from '@/context/appStoreProvider';
import { useUnmount } from '@/hooks/useUnmount';

export type SortType = 'a-z' | 'z-a' | 'newest' | 'oldest';
export type ViewType = 'list' | 'grid';

export type StateType = {
  selectedQuestionImages: string[];
  selectedPlayerImages: string[];
  sort: SortType;
  view: ViewType;
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
  CHANGE_SORT,
  CHANGE_VIEW,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string[] | SortType | ViewType;
};

const initState: StateType = {
  selectedQuestionImages: [],
  selectedPlayerImages: [],
  sort: 'a-z',
  view: 'list',
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
        selectedQuestionImages: payload as string[],
      };
    }
    case REDUCER_ACTION_TYPE.QUESTION_DESELECT_ALL: {
      return {
        ...state,
        selectedQuestionImages: [],
      };
    }
    case REDUCER_ACTION_TYPE.PLAYER_SELECT: {
      return {
        ...state,
        selectedPlayerImages: [...state.selectedPlayerImages, payload![0]],
      };
    }
    case REDUCER_ACTION_TYPE.PLAYER_DESELECT: {
      const idx = state.selectedPlayerImages.indexOf(payload![0]);
      idx !== -1 && state.selectedPlayerImages.splice(idx, 1);
      return {
        ...state,
        selectedPlayerImages: state.selectedPlayerImages,
      };
    }
    case REDUCER_ACTION_TYPE.PLAYER_SELECT_ALL: {
      return {
        ...state,
        selectedPlayerImages: payload as string[],
      };
    }
    case REDUCER_ACTION_TYPE.PLAYER_DESELECT_ALL: {
      return {
        ...state,
        selectedPlayerImages: [],
      };
    }
    case REDUCER_ACTION_TYPE.CHANGE_SORT: {
      return {
        ...state,
        sort: payload as SortType,
      };
    }
    case REDUCER_ACTION_TYPE.CHANGE_VIEW: {
      return {
        ...state,
        view: payload as ViewType,
      };
    }
    default:
      throw new Error();
  }
};

const usePageStateContext = (initState: StateType) => {
  const storedState = sessionStorage.getItem('bucketsContext');
  const initialState = storedState ? JSON.parse(storedState) : initState;

  const [state, dispatch] = useReducer(reducer, initialState);

  const questionImages = useAppStore(state => state.questionImages);
  const playerImages = useAppStore(store => store.playerImages);

  useUnmount(() => {
    sessionStorage.setItem('bucketsContext', JSON.stringify(state));
  });

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

  const selectPlayer = useCallback(
    (data: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.PLAYER_SELECT,
        payload: [data],
      }),
    []
  );

  const deselectPlayer = useCallback(
    (data: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.PLAYER_DESELECT,
        payload: [data],
      }),
    []
  );

  const selectAllPlayers = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.PLAYER_SELECT_ALL,
      payload: playerImages.map(e => e.name) as string[],
    });
  }, [playerImages]);

  const deselectAllPlayers = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.PLAYER_DESELECT_ALL,
      payload: [],
    });
  }, []);

  const changeSortType = useCallback(
    (data: SortType) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.CHANGE_SORT,
        payload: data,
      }),
    []
  );

  const changeViewType = useCallback(
    (data: ViewType) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.CHANGE_VIEW,
        payload: data,
      }),
    []
  );

  return {
    state,
    selectQuestion,
    deselectQuestion,
    selectAllQuestions,
    deselectAllQuestions,
    selectPlayer,
    deselectPlayer,
    selectAllPlayers,
    deselectAllPlayers,
    changeSortType,
    changeViewType,
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
  selectPlayer: (data: string) => {},
  deselectPlayer: (data: string) => {},
  selectAllPlayers: () => {},
  deselectAllPlayers: () => {},
  changeSortType: () => {},
  changeViewType: () => {},
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
