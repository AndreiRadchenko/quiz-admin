'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from 'react';

import { type QuestionBankType } from '@/../dictionaries/dictionaries';

export type Preferences = {
  selectedQuestionImage: string;
};

interface iPreferencesContext {
  questionsLocale: QuestionBankType;
  pagePreferences: Preferences;
  setPagePreferences: React.Dispatch<SetStateAction<Preferences>>;
}

const PageContext = createContext<iPreferencesContext>(
  {} as iPreferencesContext
);

export default function PageContextProvider({
  children,
  questionsLocale,
}: {
  children: ReactNode;
  questionsLocale: QuestionBankType;
}) {
  const [pagePreferences, setPagePreferences] = useState<Preferences>(() => {
    const preferences = {
      selectedQuestionImage: '',
    } as Preferences;
    return preferences;
  });

  return (
    <PageContext.Provider
      value={{ questionsLocale, pagePreferences, setPagePreferences }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
