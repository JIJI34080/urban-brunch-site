import { getTranslations } from 'next-intl/server';
import ReservationForm from '@/components/reservation-form';

export default async function ReservationPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'reservation' });

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-brand/70">{t('description')}</p>
      <div className="mt-8 rounded-3xl border border-beige bg-white/90 p-8 shadow-sm">
        <ReservationForm locale={locale} />
      </div>
    </section>
  );
}
