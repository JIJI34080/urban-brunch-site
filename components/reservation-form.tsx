'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { submitReservation } from '@/app/[locale]/(routes)/reservation/actions';

const schema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  people: z.coerce.number().min(1).max(12),
  email: z.string().email()
});

type FormValues = z.infer<typeof schema>;

export default function ReservationForm({ locale }: { locale: string }) {
  const t = useTranslations('reservation');
  const g = useTranslations('form');
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { date: '', time: '', people: 2, email: '' } });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, String(value)));
      const result = await submitReservation(locale, formData);
      if (result.success) {
        toast.success(t('success'));
        form.reset({ date: '', time: '', people: 2, email: '' });
      } else {
        toast.error(result.error === 'validation' ? g('required') : t('error'));
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="date">{t('date')}</Label>
        <Input id="date" type="date" {...form.register('date')} aria-invalid={!!form.formState.errors.date} />
        {form.formState.errors.date && <p className="mt-1 text-xs text-terracotta">{g('required')}</p>}
      </div>
      <div>
        <Label htmlFor="time">{t('time')}</Label>
        <Input id="time" type="time" {...form.register('time')} aria-invalid={!!form.formState.errors.time} />
        {form.formState.errors.time && <p className="mt-1 text-xs text-terracotta">{g('required')}</p>}
      </div>
      <div>
        <Label htmlFor="people">{t('people')}</Label>
        <Input id="people" type="number" min={1} max={12} {...form.register('people', { valueAsNumber: true })} aria-invalid={!!form.formState.errors.people} />
        {form.formState.errors.people && <p className="mt-1 text-xs text-terracotta">{g('required')}</p>}
      </div>
      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" {...form.register('email')} aria-invalid={!!form.formState.errors.email} />
        {form.formState.errors.email && <p className="mt-1 text-xs text-terracotta">{g('invalidEmail')}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? '…' : t('submit')}
      </Button>
    </form>
  );
}
