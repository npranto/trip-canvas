import Link from 'next/link';
import { paths, tripPath } from '@/app/routes/paths';

export default function TripsPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 py-8 text-center sm:py-16 sm:text-left">
      <div className="mx-auto flex w-full flex-col gap-8">
        <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={paths.home}>
          ← Home
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Saved trips</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          No saved trips yet. Start a new plan and it will appear here once persistence exists.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={paths.tripNew}>
            New trip
          </Link>
          <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={tripPath('example')}>
            Open example trip route
          </Link>
        </div>
      </div>
    </div>
  );
}
