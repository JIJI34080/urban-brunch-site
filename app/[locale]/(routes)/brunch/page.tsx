import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const bundles = [
  {
    key: 'urbanSoul',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    price: 'CHF 29'
  },
  {
    key: 'medinaMorning',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80',
    price: 'CHF 34'
  },
  {
    key: 'alpineGlow',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    price: 'CHF 39'
  }
];

export default async function BrunchPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'brunch' });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-brand/70">{t('subtitle')}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {bundles.map((bundle) => (
          <Card key={bundle.key} className="overflow-hidden bg-white/90 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-56 w-full">
              <Image src={bundle.image} alt={t(`${bundle.key}.title`)} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{t(`${bundle.key}.title`)}</CardTitle>
              <CardDescription>{t(`${bundle.key}.description`)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-terracotta">{bundle.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
