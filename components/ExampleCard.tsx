import { formatTitle } from '@/lib/formatTitle';

type ExampleCardProps = {
  subtitle?: string;
};

/** Reusable, feature-agnostic UI lives under `components/`. */
export function ExampleCard({ subtitle }: ExampleCardProps) {
  return (
    <section className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
      <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">{formatTitle('example card')}</h2>
      {subtitle ? <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p> : null}
    </section>
  );
}
