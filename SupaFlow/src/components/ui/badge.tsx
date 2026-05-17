import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-ink text-white',
        secondary: 'border-black/10 bg-surface-muted text-ink-muted',
        outline: 'border-black/10 text-ink-muted',
        orange: 'border-brand-orange/20 bg-brand-orange/10 text-brand-orange',
        pink: 'border-brand-pink/20 bg-brand-pink/10 text-brand-pink',
        purple: 'border-brand-purple/20 bg-brand-purple/10 text-brand-purple',
        blue: 'border-brand-blue/20 bg-brand-blue/10 text-brand-blue',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
