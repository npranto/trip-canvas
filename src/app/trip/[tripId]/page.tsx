import Link from 'next/link';
import { paths, tripPath } from '@/app/routes/paths';

type TripPageProps = {
  params: Promise<{ tripId: string }>;
};

export default async function TripPage({ params }: TripPageProps) {
  const { tripId } = await params;
  const decodedId = decodeURIComponent(tripId);

  return (
    <div className="flex flex-1 flex-col gap-8 py-8 text-center sm:py-16 sm:text-left">
      <div className="mx-auto flex w-full flex-col gap-8">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={paths.home}>
            ← Home
          </Link>
          <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={paths.trips}>
            Saved trips
          </Link>
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Trip</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Trip id <span className="font-mono text-sm text-zinc-800 dark:text-zinc-200">{decodedId}</span> — plan shell
          placeholder (direct-load safe).
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          Shareable URL: <span className="font-mono text-zinc-700 dark:text-zinc-300">{tripPath(tripId)}</span>
        </p>
      </div>
    </div>
  );
}
