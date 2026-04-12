import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';
import { formatTitle } from '@/lib/utils/format';

const cardSectionVariants = cva('rounded-lg border p-4', {
  variants: {
    tone: {
      default: 'border-zinc-200 dark:border-zinc-700',
      muted: 'border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40',
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
      <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">{formatTitle('example card')}</h2>
      {subtitle ? <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p> : null}
    </section>
  );
}
