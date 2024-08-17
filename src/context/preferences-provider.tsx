'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  SetStateAction
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { storage, Preferences } from '@/lib/localStor';
import { Locale, UNKNOWN_LOCALE } from "../../i18n-config";

const redirectedPathName = (locale: Locale, pathName: string) => {
  if (!pathName) return "/";
  const segments = pathName.split("/");
  if (locale) {
    segments[1] = locale;
  }
  return segments.join("/");
};

const defaultPreferences: Preferences = { mode: "dark", lang: UNKNOWN_LOCALE }
interface iPreferencesContext {
  userPreferences: Preferences;
  setUserPreferences: React.Dispatch<SetStateAction<Preferences>>
}

const PreferencesContext = createContext<iPreferencesContext>(
  {} as iPreferencesContext
);

export default function PreferencesProvider({
  children
}: { children: ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();

  const [userPreferences, setUserPreferences] = useState<Preferences>(() => {
    const preferences = storage.getItems();
    return preferences ? preferences : defaultPreferences;
  })

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const pathNameLocale = pathName.split('/')[1] as Locale;
    if (!isMounted) {
      setIsMounted(true);

      if (userPreferences.lang === UNKNOWN_LOCALE) {
        setUserPreferences(prevState => ({ ...prevState, lang: pathNameLocale }));
      }
    }
    else {
      if (pathNameLocale !== userPreferences.lang) {
        router.push(redirectedPathName(userPreferences.lang, pathName));
      }

      if (userPreferences.mode === 'dark') { document.documentElement.classList.add('dark') }
      else { document.documentElement.classList.remove('dark') }

      storage.setItems(userPreferences);
    }
  }, [userPreferences, isMounted, router, pathName])

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
