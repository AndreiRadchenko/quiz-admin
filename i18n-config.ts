export const UNKNOWN_LOCALE = 'un-known';

export const i18n = {
  defaultLocale: 'en',
  locales: [UNKNOWN_LOCALE, 'en', 'uk'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
