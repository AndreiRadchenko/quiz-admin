'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import { type QuizTiersType } from '@/../dictionaries/dictionaries';

type PageContextType = {
  tiersLocale: QuizTiersType;
};

const initContextState: PageContextType = {
  tiersLocale: {},
};

const PageContext = createContext<PageContextType>(initContextState);

export default function PageContextProvider({
  children,
  tiersLocale,
}: {
  children: ReactNode;
  tiersLocale: QuizTiersType;
}) {
  return (
    <PageContext.Provider value={{ tiersLocale }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
