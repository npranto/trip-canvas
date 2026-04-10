import Link from 'next/link';
import { paths } from '@/app/routes/paths';
import { fetchExampleTrip } from '@/services/example-trip';

export default async function NewTripPage() {
  const trip = await fetchExampleTrip();
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-8 text-center sm:text-left">
        <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={paths.home}>
          ← Home
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">New trip</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Example service data: {trip.title}</p>
      </main>
    </div>
  );
}
