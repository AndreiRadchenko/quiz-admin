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
import { Locale, UNKNOWN_LOCALE } from "../../i18n-config";

export type Preferences = {
  mode: 'dark' | 'light';
  lang: Locale;
};

const redirectedPathName = (locale: Locale, pathName: string) => {
  if (!pathName) return "/";
  const segments = pathName.split("/");
  if (locale) {
    segments[1] = locale;
  }
  return segments.join("/");
};

const getCookieValue = (name: string) => {
  if (global?.window !== undefined) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
  }
}

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
    const preferences = {
      mode: getCookieValue('theme') || 'dark',
      lang: getCookieValue('lang') || 'en'
    } as Preferences;
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

      // storage.setItems(userPreferences);
      document.cookie = `theme=${userPreferences.mode}; max-age=31536000; path=/`
      document.cookie = `lang=${userPreferences.lang}; max-age=31536000; path=/`

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
