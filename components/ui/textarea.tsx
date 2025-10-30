import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  return <textarea className={cn('min-h-[120px] w-full rounded-xl border border-beige bg-white/80 px-4 py-3 text-sm text-brand shadow-sm transition focus-visible:border-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props} />;
});
Textarea.displayName = 'Textarea';

export { Textarea };
