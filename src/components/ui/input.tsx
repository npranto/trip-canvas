import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';

const inputFieldVariants = cva(
  'w-full min-w-0 rounded-md border border-tc-slate-200 bg-surface text-foreground transition-colors placeholder:text-fg-muted hover:border-tc-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error aria-invalid:focus-visible:ring-error',
  {
    variants: {
      variant: {
        default: '',
        search: '',
      },
      size: {
        sm: 'py-1.5 px-3 text-sm leading-5',
        md: 'py-2 px-3 text-base leading-6',
        lg: 'py-2.5 px-4 text-lg leading-7',
      },
    },
    compoundVariants: [
      { variant: 'search', size: 'sm', class: 'text-base md:text-lg' },
      { variant: 'search', size: 'md', class: 'text-lg md:text-xl' },
      { variant: 'search', size: 'lg', class: 'text-xl md:text-2xl' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const addonShellVariants = cva(
  'flex min-w-0 items-center rounded-md border border-tc-slate-200 bg-surface transition-colors hover:border-tc-slate-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 focus-within:ring-offset-background',
  {
    variants: {
      size: {
        sm: 'gap-1.5 px-2.5 py-1.5 [&_svg]:size-4',
        md: 'gap-2 px-3 py-2 [&_svg]:size-4',
        lg: 'gap-2 px-3 py-2.5 [&_svg]:size-5',
      },
      invalid: {
        true: 'border-error focus-within:ring-error',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      invalid: false,
      disabled: false,
    },
  },
);

const addonInputVariants = cva(
  'h-auto min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-foreground shadow-none placeholder:text-fg-muted outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: '',
        search: '',
      },
      size: {
        sm: 'text-sm leading-5',
        md: 'text-base leading-6',
        lg: 'text-lg leading-7',
      },
    },
    compoundVariants: [
      { variant: 'search', size: 'sm', class: 'text-base md:text-lg' },
      { variant: 'search', size: 'md', class: 'text-lg md:text-xl' },
      { variant: 'search', size: 'lg', class: 'text-xl md:text-2xl' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type InputVariant = NonNullable<VariantProps<typeof inputFieldVariants>['variant']>;
export type InputSize = NonNullable<VariantProps<typeof inputFieldVariants>['size']>;

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size' | 'suffix'>,
    VariantProps<typeof inputFieldVariants> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    variant,
    size,
    label,
    hint,
    error,
    prefix,
    suffix,
    id,
    disabled,
    'aria-invalid': ariaInvalidProp,
    'aria-describedby': ariaDescribedByProp,
    ...props
  },
  ref,
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const showHint = Boolean(hint);
  const showError = Boolean(error);

  const invalid =
    showError ||
    ariaInvalidProp === true ||
    ariaInvalidProp === 'true' ||
    ariaInvalidProp === 'grammar' ||
    ariaInvalidProp === 'spelling';

  const describedByParts = [ariaDescribedByProp, showHint ? hintId : null, showError ? errorId : null].filter(
    Boolean,
  ) as string[];
  const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

  const hasAddon = Boolean(prefix) || Boolean(suffix);

  const control = (
    <input
      ref={ref}
      id={inputId}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        !hasAddon ? inputFieldVariants({ variant, size }) : addonInputVariants({ variant, size }),
        hasAddon && 'py-0',
        className,
      )}
      {...props}
    />
  );

  const field = hasAddon ? (
    <div
      className={cn(
        addonShellVariants({
          size,
          invalid,
          disabled: Boolean(disabled),
        }),
      )}
    >
      {prefix ? <span className="shrink-0 text-fg-muted">{prefix}</span> : null}
      {control}
      {suffix ? <span className="shrink-0 text-fg-muted">{suffix}</span> : null}
    </div>
  ) : (
    control
  );

  const hasChrome = Boolean(label) || showHint || showError;

  if (!hasChrome) {
    return field;
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className={cn(typography.label, 'text-foreground')}>
          {label}
        </label>
      ) : null}
      {field}
      {showHint ? (
        <p id={hintId} className={cn(typography['body-small'], 'text-fg-muted')}>
          {hint}
        </p>
      ) : null}
      {showError ? (
        <p id={errorId} className={cn(typography['body-small'], 'text-error')} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
