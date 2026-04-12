import Link from 'next/link';
import { paths } from '@/app/routes/paths';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';
import { fetchExampleTrip } from '@/services/example-trip';

export default async function NewTripPage() {
  const trip = await fetchExampleTrip();
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
        <h1 className={cn(typography.h1, 'mt-6 text-foreground')}>New trip</h1>
        <p className={cn(typography.body, 'mt-2 text-fg-secondary')}>Example service data: {trip.title}</p>
      </div>
    </div>
  );
}
