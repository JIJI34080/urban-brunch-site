'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type MenuData = {
  sections: {
    key: string;
    items: { key: string; price: number; tags: string[] }[];
  }[];
  allergens: string[];
};

type MenuTranslations = {
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

const filterKeys = [
  { key: 'halal', tag: 'halal' },
  { key: 'veg', tag: 'veg' },
  { key: 'lf', tag: 'lf' },
  { key: 'gf', tag: 'gf' }
];

export default function MenuBrowser({ menu, translations }: { menu: MenuData; translations: MenuTranslations }) {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return menu.sections.map((section) => {
      const items = section.items.filter((item) => {
        const label = translations.items[item.key] ?? '';
        const matchesSearch = label.toLowerCase().includes(search.toLowerCase());
        const matchesFilters =
          activeFilters.length === 0 ||
          activeFilters.every((filter) => {
            return item.tags.includes(filter);
          });
        return matchesSearch && matchesFilters;
      });
      return { ...section, items };
    });
  }, [menu.sections, search, activeFilters, translations.items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-beige bg-white/80 p-6 shadow-sm">
        <Input placeholder={translations.ui.search} value={search} onChange={(event) => setSearch(event.target.value)} />
        <div>
          <p className="text-sm font-semibold uppercase text-brand/60">{translations.ui.filters.title}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {filterKeys.map((filter) => (
              <button
                key={filter.key}
                onClick={() =>
                  setActiveFilters((prev) =>
                    prev.includes(filter.tag) ? prev.filter((tag) => tag !== filter.tag) : [...prev, filter.tag]
                  )
                }
                className={cn(
                  'rounded-full border border-beige px-4 py-2 text-sm transition hover:border-terracotta hover:text-terracotta',
                  activeFilters.includes(filter.tag) && 'border-terracotta bg-terracotta text-cream'
                )}
                type="button"
              >
                {translations.ui.filters[filter.key as keyof typeof translations.ui.filters]}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs uppercase text-brand/50">
          {translations.ui.allergens.replace('{list}', menu.allergens.join(', '))}
        </p>
      </div>

      <div className="space-y-10">
        {filtered.map((section) => (
          <div key={section.key}>
            <h2 className="text-2xl font-semibold">{translations.sections[section.key]}</h2>
            <motion.div className="mt-6 grid gap-6 md:grid-cols-2" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
              {section.items.map((item) => (
                <motion.div key={item.key} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="rounded-3xl border border-beige bg-white/90 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{translations.items[item.key]}</h3>
                      <p className="mt-2 text-sm text-brand/70">{translations.descriptions[item.key]}</p>
                    </div>
                    <p className="text-lg font-semibold text-terracotta">CHF {item.price.toFixed(1)}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{translations.tags[tag]}</Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
              {section.items.length === 0 && (
                <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="rounded-3xl border border-dashed border-beige px-6 py-10 text-center text-sm text-brand/60">
                  {translations.ui.empty}
                </motion.p>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
