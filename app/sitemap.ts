import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

const routes = ['', 'menu', 'brunch', 'galerie', 'a-propos', 'contact', 'reservation', 'legal'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://urban-brunch.example.com';
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route ? `/${route}` : ''}`,
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.7
      });
    }
  }

  entries.push({ url: `${baseUrl}/admin`, changeFrequency: 'monthly', priority: 0.3 });

  return entries;
}
