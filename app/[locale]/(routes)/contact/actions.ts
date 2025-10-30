'use server';

import { z } from 'zod';
import { sendMail } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function submitContact(locale: string, formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  });

  if (!parsed.success) {
    return { success: false, error: 'validation' };
  }

  await sendMail(process.env.SMTP_USER ?? 'hello@example.com', {
    subject: `URBAN BRUNCH · Contact (${locale})`,
    html: `<p><strong>${parsed.data.name}</strong> (${parsed.data.email})</p><p>${parsed.data.message}</p>`
  });

  return { success: true };
}
