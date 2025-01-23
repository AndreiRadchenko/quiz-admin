'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from 'react';

export type Preferences = {
  selectedQuestionImage: string;
};

interface iPreferencesContext {
  pagePreferences: Preferences;
  setPagePreferences: React.Dispatch<SetStateAction<Preferences>>;
}

const PageContext = createContext<iPreferencesContext>(
  {} as iPreferencesContext
);

export default function PageContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pagePreferences, setPagePreferences] = useState<Preferences>(() => {
    const preferences = {
      selectedQuestionImage: '',
    } as Preferences;
    return preferences;
  });

  return (
    <PageContext.Provider value={{ pagePreferences, setPagePreferences }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
