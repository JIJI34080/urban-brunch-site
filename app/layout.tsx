import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URBAN BRUNCH',
  description: 'Creative halal brunch every day in the heart of Neuchâtel.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
