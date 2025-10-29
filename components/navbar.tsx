'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Logo from './logo';
import LocaleSwitcher from './locale-switcher';
import { motion } from 'framer-motion';

const links = ['home', 'menu', 'brunch', 'gallery', 'about', 'contact'];

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const current = pathname?.split('/')[2] ?? '';

  return (
    <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="sticky top-0 z-50 border-b border-beige/60 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo locale={locale} />
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {links.map((key) => (
            <Link key={key} href={`/${locale}/${key === 'home' ? '' : key}`.replace(/\/$/, '')} className={cn('transition hover:text-terracotta', current === (key === 'home' ? '' : key) && 'text-terracotta font-semibold')}>
              {t(key as 'home')}
            </Link>
          ))}
          <Link href={`/${locale}/reservation`} className={cn('transition hover:text-terracotta', current === 'reservation' && 'text-terracotta font-semibold')}>
            {t('reservation')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
