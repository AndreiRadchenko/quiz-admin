'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import { type AnswersType } from '@/../dictionaries/dictionaries';

type PageContextType = {
  answersLocale: AnswersType;
};

const initContextState: PageContextType = {
  answersLocale: {},
};

const PageContext = createContext<PageContextType>(initContextState);

export default function PageContextProvider({
  children,
  answersLocale,
}: {
  children: ReactNode;
  answersLocale: AnswersType;
}) {
  return (
    <PageContext.Provider value={{ answersLocale }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
