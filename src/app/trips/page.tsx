import Link from 'next/link';
import { paths, tripPath } from '@/app/routes/paths';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';

export default function TripsPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 py-8 text-center sm:py-16 sm:text-left">
      <div className="mx-auto flex w-full flex-col gap-8">
        <Link
          className={cn(
            typography['body-small'],
            'text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover',
          )}
          href={paths.home}
        >
          ← Home
        </Link>
        <h1 className={cn(typography.h1, 'mt-6 text-foreground')}>Saved trips</h1>
        <p className={cn(typography.body, 'mt-2 text-fg-secondary')}>
          No saved trips yet. Start a new plan and it will appear here once persistence exists.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            className={cn(
              typography['body-small'],
              'text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover',
            )}
            href={paths.tripNew}
          >
            New trip
          </Link>
          <Link
            className={cn(
              typography['body-small'],
              'text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover',
            )}
            href={tripPath('example')}
          >
            Open example trip route
          </Link>
        </div>
      </div>
    </div>
  );
}
