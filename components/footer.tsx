import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/lib/i18n';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <footer className="border-t border-beige/60 bg-cream/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">URBAN BRUNCH</p>
          <p className="text-sm text-brand/60">Rue de l’Hôpital, 2000 Neuchâtel</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-brand/80">
          <Link href={`/${locale}`}>{nav('home')}</Link>
          <Link href={`/${locale}/menu`}>{nav('menu')}</Link>
          <Link href={`/${locale}/brunch`}>{nav('brunch')}</Link>
          <Link href={`/${locale}/galerie`}>{nav('gallery')}</Link>
          <Link href={`/${locale}/a-propos`}>{nav('about')}</Link>
          <Link href={`/${locale}/contact`}>{nav('contact')}</Link>
          <Link href={`/${locale}/reservation`}>{nav('reservation')}</Link>
          <Link href={`/${locale}/legal`}>{nav('legal')}</Link>
        </nav>
        <div className="text-xs text-brand/60">
          <p>© {new Date().getFullYear()} URBAN BRUNCH · {t('rights')}</p>
          <p className="mt-2">
            {locales.map((loc) => (
              <Link key={loc} href={`/${loc}`} className="mr-2 underline">
                {loc}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
