import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';

export function UiPrimitiveSection({
  title,
  description,
  children,
  className,
}: Readonly<{
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <section className={cn('border-b border-edge py-10 last:border-b-0', className)}>
      <header className="mb-6 space-y-2">
        <h2 className={cn(typography.h2, 'text-foreground')}>{title}</h2>
        {description ? (
          <p className={cn(typography['body-small'], 'max-w-2xl text-fg-secondary')}>{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

export function UiPrimitiveRow({
  label,
  children,
}: Readonly<{
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-3 border-t border-edge py-6 first:border-t-0 first:pt-0 sm:flex-row sm:items-center">
      <p className={cn(typography.label, 'w-full shrink-0 text-fg-muted sm:w-44')}>{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
