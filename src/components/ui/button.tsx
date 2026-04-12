import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand-primary text-fg-inverse hover:bg-brand-primary-hover focus-visible:ring-offset-background',
        secondary: 'bg-brand-primary-soft text-brand-primary hover:bg-tc-blue-100 dark:hover:bg-surface-subtle',
        outline:
          'border border-edge bg-surface text-brand-primary hover:bg-surface-subtle focus-visible:ring-offset-background',
        ghost: 'text-brand-primary hover:bg-brand-primary-soft dark:hover:bg-brand-primary-soft/40',
        danger:
          'bg-error text-fg-inverse hover:brightness-[0.97] focus-visible:ring-error focus-visible:ring-offset-background',
        link: 'h-auto min-h-0 justify-normal gap-1 rounded-none border-0 bg-transparent p-0 text-brand-primary underline-offset-4 shadow-none hover:bg-transparent hover:underline focus-visible:ring-offset-0',
      },
      size: {
        sm: 'h-8 px-3 text-sm [&_svg]:size-4',
        md: 'h-10 px-4 text-sm [&_svg]:size-4',
        lg: 'h-12 px-6 text-base [&_svg]:size-5',
        icon: 'size-10 p-0 [&_svg]:size-4',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        size: 'sm',
        class: 'text-sm',
      },
      {
        variant: 'link',
        size: 'md',
        class: 'text-base',
      },
      {
        variant: 'link',
        size: 'lg',
        class: 'text-lg',
      },
      {
        variant: 'link',
        size: 'icon',
        class: 'text-base',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, isLoading = false, leftIcon, rightIcon, disabled, children, type = 'button', ...props },
  ref,
) {
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? <LoaderCircle className="size-4 shrink-0 animate-spin" aria-hidden /> : leftIcon}
      {children}
      {!isLoading ? rightIcon : null}
    </button>
  );
});

Button.displayName = 'Button';
