import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, createTranslator, unstable_setRequestLocale } from 'next-intl/server';
import { locales, defaultLocale, isValidLocale } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Providers from '@/components/providers';

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) return {};
  const messages = await getMessages({ locale });
  const t = createTranslator({ locale, messages, namespace: 'common' });
  return {
    metadataBase: new URL('https://urban-brunch.example.com'),
    title: `${t('brand')} · ${t('tagline')}`,
    description: t('meta.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((loc) => [loc, `/${loc}`])),
      'x-default': `/${defaultLocale}`
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages} defaultTranslationValues={{ brand: 'URBAN BRUNCH' }}>
      <Providers>
        <div className="flex min-h-screen flex-col bg-cream">
          <Navbar locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
