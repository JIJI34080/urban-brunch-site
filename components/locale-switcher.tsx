'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locales } from '@/lib/i18n';
import { startTransition } from 'react';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('language');

  return (
    <div className="flex min-w-[160px] items-center gap-2">
      <span className="text-xs font-semibold uppercase text-brand/70">{t('label')}</span>
      <Select
        value={currentLocale}
        onValueChange={(value) => {
          const segments = pathname.split('/').filter(Boolean);
          segments[0] = value;
          const nextPath = `/${segments.join('/')}` || `/${value}`;
          document.cookie = `urb-locale=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
          startTransition(() => router.push(nextPath));
        }}
      >
        <SelectTrigger className="h-9">
          <SelectValue aria-label={currentLocale}>{currentLocale}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale} aria-label={locale}>
              {locale}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
