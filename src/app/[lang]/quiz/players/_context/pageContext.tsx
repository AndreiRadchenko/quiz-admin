'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import { type PlayersType } from '@/../dictionaries/dictionaries';

type PageContextType = {
  playersLocale: PlayersType;
};

const initContextState: PageContextType = {
  playersLocale: {},
};

const PageContext = createContext<PageContextType>(initContextState);

export default function PageContextProvider({
  children,
  playersLocale,
}: {
  children: ReactNode;
  playersLocale: PlayersType;
}) {
  return (
    <PageContext.Provider value={{ playersLocale }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
