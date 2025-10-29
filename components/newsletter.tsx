'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Newsletter() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-center">
      <div className="rounded-3xl border border-beige bg-white/90 p-10 shadow-sm">
        <h2 className="text-2xl font-semibold">{t('title')}</h2>
        <p className="mt-2 text-brand/70">{t('description')}</p>
        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            toast.success(t('success'));
            setEmail('');
          }}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('placeholder')} type="email" required />
          <Button type="submit" className="sm:ml-3">
            {t('submit')}
          </Button>
        </form>
      </div>
    </section>
  );
}
