import nodemailer from 'nodemailer';

type EmailPayload = {
  subject: string;
  html: string;
};

export async function sendMail(to: string, payload: EmailPayload) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('SMTP credentials missing');
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });

  await transporter.sendMail({
    from: `URBAN BRUNCH <${user}>`,
    to,
    ...payload
  });
}
