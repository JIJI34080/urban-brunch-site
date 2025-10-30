import { getMessages, getTranslations } from 'next-intl/server';
import menuData from '@/data/menu.json';
import MenuBrowser from '@/components/menu-browser';

export default async function MenuPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const heading = await getTranslations({ locale, namespace: 'nav' });
  const messages = await getMessages({ locale });
  const menuMessages = messages.menu as {
    sections: Record<string, string>;
    items: Record<string, string>;
    descriptions: Record<string, string>;
    tags: Record<string, string>;
    ui: {
      search: string;
      filters: { title: string; only: string; halal: string; veg: string; lf: string; gf: string };
      allergens: string;
      empty: string;
    };
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{heading('menu')}</h1>
      </div>
      <MenuBrowser menu={menuData} translations={menuMessages} />
    </section>
  );
}
