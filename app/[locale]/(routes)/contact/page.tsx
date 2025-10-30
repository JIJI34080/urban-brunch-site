import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contact-form';
import Map from '@/components/map';

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const mapT = await getTranslations({ locale, namespace: 'map' });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-4 text-brand/70">{t('address')}</p>
          <div className="mt-6 rounded-3xl border border-beige bg-white/90 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">{t('form.title')}</h2>
            <p className="mt-2 text-sm text-brand/70">hello@urbanbrunch.ch · +41 32 000 00 00</p>
            <div className="mt-6">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{mapT('title')}</h2>
          <Map locale={locale} embedded />
        </div>
      </div>
    </section>
  );
}
