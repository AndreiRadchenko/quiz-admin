import 'server-only';

import dict from './en.json';

const {
  menu,
  quiz: { buckets, questionDefinitions, alertConfirmationDialog },
} = dict;

export type NestedType<T, K extends keyof T> = T[K];
export type ArrayElementType<T> = T extends Array<infer U> ? U : never;

export type MenuType = typeof menu;
export type AlertConfirmationDialogType = Partial<
  typeof alertConfirmationDialog
>;
export type QuestionDefinitionsType = typeof questionDefinitions;
export type BucketsType = Partial<typeof buckets>;

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

export function replacePlaceholders(
  template: string,
  values: { [key: string]: string | number }
) {
  return template.replace(
    /{{(.*?)}}/g,
    (_, key) => values[key]?.toString() || ''
  );
}
