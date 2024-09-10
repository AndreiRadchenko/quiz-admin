import 'server-only';

import dict from './en.json';

const { menu } = dict;
export type MenuType = typeof menu;

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
interface iDictionary {
  [key: string]: () => Promise<any>;
}

const dictionaries: iDictionary = {
  en: () => import('./en.json').then(module => module.default),
  uk: () => import('./uk.json').then(module => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale]?.() ?? dictionaries.en();
