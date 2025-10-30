'use client';

import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors closeButton theme="system" duration={5000} toastOptions={{ className: 'rounded-xl bg-brand text-cream shadow-lg' }} />
    </>
  );
}
