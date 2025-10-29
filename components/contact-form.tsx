'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { submitContact } from '@/app/[locale]/(routes)/contact/actions';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact.form');
  const g = useTranslations('form');
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', message: '' } });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('message', values.message);
      const result = await submitContact(locale, formData);
      if (result.success) {
        toast.success(t('success'));
        form.reset();
      } else {
        toast.error(result.error === 'validation' ? g('required') : t('error'));
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">{t('name')}</Label>
        <Input id="name" placeholder={t('name')} {...form.register('name')} aria-invalid={!!form.formState.errors.name} />
        {form.formState.errors.name && <p className="mt-1 text-xs text-terracotta">{g('required')}</p>}
      </div>
      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" placeholder={t('email')} {...form.register('email')} aria-invalid={!!form.formState.errors.email} />
        {form.formState.errors.email && <p className="mt-1 text-xs text-terracotta">{g('invalidEmail')}</p>}
      </div>
      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" placeholder={t('message')} {...form.register('message')} aria-invalid={!!form.formState.errors.message} />
        {form.formState.errors.message && <p className="mt-1 text-xs text-terracotta">{g('required')}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? '…' : t('submit')}
      </Button>
    </form>
  );
}
