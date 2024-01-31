// headline api lang lists from https://newsapi.org/docs/endpoints/everything
enum Locales {
  en = 'en',
  fr = 'fr',
  jp = 'jp',
}
export const i18n = {
  defaultLocale: Locales.en,
  locales: [Locales.en, Locales.fr, Locales.jp],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const LOCALE_COOKIE_NAME = 'MY_LOCALE';
