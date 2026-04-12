import { cva, type VariantProps } from 'class-variance-authority';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';
import { formatTitle } from '@/lib/utils/format';

const cardSectionVariants = cva('rounded-lg border p-4', {
  variants: {
    tone: {
      default: 'border-edge bg-surface',
      muted: 'border-edge bg-surface-subtle',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

type ExampleCardProps = VariantProps<typeof cardSectionVariants> & {
  subtitle?: string;
  className?: string;
};

/** Reusable, feature-agnostic UI lives under `components/`. */
export function ExampleCard({ subtitle, tone, className }: ExampleCardProps) {
  return (
    <section className={cn(cardSectionVariants({ tone }), className)}>
      <h2 className={cn(typography.h3, 'text-foreground')}>{formatTitle('example card')}</h2>
      {subtitle ? <p className={cn(typography['body-small'], 'mt-1 text-fg-muted')}>{subtitle}</p> : null}
    </section>
  );
}
