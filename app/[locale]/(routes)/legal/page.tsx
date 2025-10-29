import { getTranslations } from 'next-intl/server';

export default async function LegalPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'legal' });

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-6 whitespace-pre-line text-brand/70">{t('content')}</p>
    </section>
  );
}
