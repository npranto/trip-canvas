import { fetchExampleTrip } from '@/services/example-trip';

/** Feature-local UI: may call `services/`, not raw external APIs from the client. */
export async function ExampleGreeting() {
  const trip = await fetchExampleTrip();
  return (
    <p className="text-lg text-zinc-800 dark:text-zinc-200">
      Example feature → service: <span className="font-medium">{trip.title}</span>
    </p>
  );
}
