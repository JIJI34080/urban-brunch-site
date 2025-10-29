import { getTranslations } from 'next-intl/server';
import GalleryGrid from '@/components/gallery-grid';

export default async function GalleryPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'gallery' });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-brand/70">{t('description')}</p>
      </div>
      <GalleryGrid />
    </section>
  );
}
