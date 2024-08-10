'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  SetStateAction
} from "react";

import { storage, Preferences } from '@/lib/localStor';

const defaultPreferences: Preferences = { mode: "dark", lang: "en" }

interface iPreferencesContext {
  userPreferences: Preferences;
  setUserPreferences: React.Dispatch<SetStateAction<Preferences>>
}

const PreferencesContext = createContext<iPreferencesContext>(
  {} as iPreferencesContext
);

export default function PreferencesProvider({
  children,
}: { children: ReactNode }) {

  const [userPreferences, setUserPreferences] = useState<Preferences>(() => {
    const preferences = storage.getItems();
    return preferences ? preferences : defaultPreferences;
  })

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    else {
      storage.setItems(userPreferences);
      if (userPreferences.mode === 'dark') { document.documentElement.classList.add('dark') }
      else { document.documentElement.classList.remove('dark') }
    }
  }, [userPreferences, isMounted])

  if (!isMounted) {
    return null;
  }

  return (
    <PreferencesContext.Provider value={{ userPreferences, setUserPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferencesContext() {
  return useContext(PreferencesContext);
}
