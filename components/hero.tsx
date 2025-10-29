'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('cta');
  const hero = useTranslations('hero');

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-terracotta">{hero('kicker')}</p>
        <h1 className="text-4xl font-bold sm:text-5xl">{hero('description')}</h1>
        <p className="text-lg text-brand/70">{t('order')} · {t('viewMenu')}</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href={`/${locale}/menu`}>{t('viewMenu')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/${locale}/reservation`}>{t('book')}</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href={`/${locale}/contact`}>{t('order')}</Link>
          </Button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] border border-beige">
        <Image src="https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=900&q=80" alt={hero('imageAlt')} fill className="object-cover" priority />
      </motion.div>
    </section>
  );
}
