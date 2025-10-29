'use server';

import { z } from 'zod';
import { sendMail } from '@/lib/email';

const schema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  people: z.coerce.number().min(1).max(12),
  email: z.string().email()
});

export async function submitReservation(locale: string, formData: FormData) {
  const parsed = schema.safeParse({
    date: formData.get('date'),
    time: formData.get('time'),
    people: formData.get('people'),
    email: formData.get('email')
  });

  if (!parsed.success) {
    return { success: false, error: 'validation' };
  }

  const { date, time, people, email } = parsed.data;

  const html = `<h1>Réservation URBAN BRUNCH</h1>
  <p><strong>Date:</strong> ${date}</p>
  <p><strong>Heure:</strong> ${time}</p>
  <p><strong>Personnes:</strong> ${people}</p>
  <p><strong>Email:</strong> ${email}</p>`;

  await Promise.all([
    sendMail(process.env.SMTP_USER ?? 'hello@example.com', {
      subject: `URBAN BRUNCH · Reservation (${locale})`,
      html
    }),
    sendMail(email, {
      subject: 'URBAN BRUNCH · Confirmation',
      html: `<p>Merci pour votre réservation du ${date} à ${time} pour ${people} personnes. À très vite !</p>`
    })
  ]);

  return { success: true };
}
