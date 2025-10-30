import { getTranslations } from 'next-intl/server';
import { hours, getTodayStatus } from '@/lib/hours';
import { Badge } from '@/components/ui/badge';

export default async function Hours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'hours' });
  const status = getTodayStatus();

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-beige bg-white/90 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">{t('title')}</h2>
          {status.status === 'open' ? <Badge variant="default">{t('openNow')}</Badge> : <Badge variant="outline">{t('closedNow')}</Badge>}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hours.map((entry) => (
            <div key={entry.day} className="flex items-center justify-between rounded-2xl bg-cream/70 px-4 py-3 text-sm text-brand">
              <span className="font-medium">{t(`day.${entry.day}`)}</span>
              <span>{'closed' in entry && entry.closed ? t('closed') : `${entry.open} – ${entry.close}`}</span>
            </div>
          ))}
        </div>
        {status.nextOpening && status.status === 'closed' && (
          <p className="mt-4 text-sm text-brand/70">
            {t('nextOpening', {
              time: `${t(`day.${status.nextOpening.day}`)} ${status.nextOpening.time}`
            })}
          </p>
        )}
      </div>
    </section>
  );
}
