import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-lg text-brand/80">
            {t('mission')}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-brand/80">
            {t('sustainability')}
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative aspect-[4/5] overflow-hidden rounded-[40px] border border-beige">
          <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80" alt="Equipe URBAN BRUNCH" fill className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
