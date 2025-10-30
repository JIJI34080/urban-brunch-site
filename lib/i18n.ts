export const locales = ['fr-CH', 'de-CH', 'it-CH', 'rm-CH', 'en'] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'fr-CH';

export const localePrefix = 'always';

export function isValidLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}
