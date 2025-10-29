import { locales } from '@/lib/i18n';

export const editableFiles = [
  'data/menu.json',
  'data/hours.json',
  ...locales.flatMap((locale) => [
    `locales/${locale}/common.json`,
    `locales/${locale}/menu.json`
  ])
];
