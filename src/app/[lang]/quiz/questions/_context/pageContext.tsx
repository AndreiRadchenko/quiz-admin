'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import { type QuestionBankType } from '@/../dictionaries/dictionaries';

type PageContextType = {
  questionsLocale: QuestionBankType;
};

const initContextState: PageContextType = {
  questionsLocale: {},
};

const PageContext = createContext<PageContextType>(initContextState);

export default function PageContextProvider({
  children,
  questionsLocale,
}: {
  children: ReactNode;
  questionsLocale: QuestionBankType;
}) {
  return (
    <PageContext.Provider value={{ questionsLocale }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
