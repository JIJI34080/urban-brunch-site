import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import './globals.css';

export const locales = ['fr-CH','de-CH','it-CH','rm-CH','en'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'URBAN BRUNCH',
    description: 'Brunch créatif, gourmand & halal — tous les jours.'
  };
}

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
    </NextIntlClientProvider>
  );
}
