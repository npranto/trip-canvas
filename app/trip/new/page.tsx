import Link from 'next/link';
import { paths } from '@/app/routes/paths';
import { fetchExampleTrip } from '@/services/example-trip';

export default async function NewTripPage() {
  const trip = await fetchExampleTrip();
  return (
    <div className="flex flex-1 flex-col gap-8 bg-zinc-50 py-8 text-center sm:py-16 sm:text-left dark:bg-black">
      <div className="mx-auto flex w-full flex-col gap-8">
        <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={paths.home}>
          ← Home
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">New trip</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Example service data: {trip.title}</p>
      </div>
    </div>
  );
}
