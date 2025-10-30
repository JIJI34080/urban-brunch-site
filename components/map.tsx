import { getTranslations } from 'next-intl/server';

export default async function Map({ locale, embedded = false }: { locale: string; embedded?: boolean }) {
  const t = await getTranslations({ locale, namespace: 'map' });

  const content = (
    <div>
      {!embedded && <h2 className="text-2xl font-semibold">{t('title')}</h2>}
      <div className="mt-4 overflow-hidden rounded-3xl border border-beige shadow-lg">
        <iframe
          title={t('aria')}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.071789765144!2d6.927132676680117!3d46.98998713353862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e0b3ceebd6757%3A0xe1424b5d4798365!2sRue%20de%20l&#39;H%C3%B4pital%2C%202000%20Neuch%C3%A2tel!5e0!3m2!1sen!2sch!4v1700000000000!5m2!1sen!2sch"
          className="h-[360px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {content}
    </section>
  );
}
