import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn('flex h-11 w-full rounded-xl border border-beige bg-white/80 px-4 text-sm text-brand shadow-sm transition focus-visible:border-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
