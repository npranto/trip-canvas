import Link from 'next/link';
import { paths, tripPath } from '@/app/routes/paths';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';

type TripPageProps = {
  params: Promise<{ tripId: string }>;
};

export default async function TripPage({ params }: TripPageProps) {
  const { tripId } = await params;
  const decodedId = decodeURIComponent(tripId);

  return (
    <div className="flex flex-1 flex-col gap-8 py-8 text-center sm:py-16 sm:text-left">
      <div className="mx-auto flex w-full flex-col gap-8">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link
            className={cn(
              typography['body-small'],
              'text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover',
            )}
            href={paths.home}
          >
            ← Home
          </Link>
          <Link
            className={cn(
              typography['body-small'],
              'text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover',
            )}
            href={paths.trips}
          >
            Saved trips
          </Link>
        </div>
        <h1 className={cn(typography.h1, 'mt-2 text-foreground')}>Trip</h1>
        <p className={cn(typography.body, 'mt-2 text-fg-secondary')}>
          Trip id <span className={cn(typography['body-small'], 'font-mono text-foreground')}>{decodedId}</span> — plan
          shell placeholder (direct-load safe).
        </p>
        <p className={cn(typography['body-small'], 'text-fg-muted')}>
          Shareable URL: <span className="font-mono text-fg-secondary">{tripPath(tripId)}</span>
        </p>
      </div>
    </div>
  );
}
