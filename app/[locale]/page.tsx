import { getTranslations } from 'next-intl/server';
import Hero from '@/components/hero';
import Hours from '@/components/hours';
import Newsletter from '@/components/newsletter';
import Map from '@/components/map';
import menuData from '@/data/menu.json';
import hoursData from '@/data/hours.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const menuTranslations = await getTranslations({ locale, namespace: 'menu' });
  const topItems = menuData.sections.flatMap((section) => section.items).slice(0, 3);
  const openingHours = hoursData
    .map((entry) =>
      'closed' in entry && entry.closed
        ? null
        : `${entry.day.substring(0, 2).toUpperCase()} ${entry.open}-${entry.close}`
    )
    .filter(Boolean) as string[];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: t('brand'),
    description: t('meta.description'),
    url: `https://urban-brunch.example.com/${locale}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue de l’Hôpital',
      addressLocality: 'Neuchâtel',
      postalCode: '2000',
      addressCountry: 'CH'
    },
    openingHours,
    servesCuisine: ['Brunch', 'Fusion'],
    priceRange: 'CHF'
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Hero locale={locale} />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {topItems.map((item) => (
            <Card key={item.key} className="bg-white/90 transition hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{menuTranslations(`items.${item.key}`)}</CardTitle>
                <CardDescription>{menuTranslations(`descriptions.${item.key}`)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-terracotta">CHF {item.price.toFixed(1)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Hours locale={locale} />
      <Newsletter />
      <Map locale={locale} />
    </>
  );
}
