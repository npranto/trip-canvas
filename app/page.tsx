import Link from 'next/link';
import { paths } from '@/app/routes/paths';
import { ExampleCard } from '@/components/ExampleCard';
import { ExampleGreeting } from '@/features/example-feature/ExampleGreeting';

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 bg-zinc-50 py-8 text-center sm:py-16 sm:text-left dark:bg-black">
      <div className="mx-auto flex w-full flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            TripCanvas
          </h1>
        </div>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          TripCanvas is an AI-native travel planning prototype that turns a user&apos;s natural-language trip request
          into a structured, editable travel plan. Instead of behaving like a raw chatbot, it combines conversational
          input, itinerary generation, recommendation cards, and clear confidence/fallback states to help users move
          from vague travel intent to a usable trip plan. It is designed as the frontend foundation for a future booking
          companion rather than a one-off AI wrapper.
        </p>

        <ExampleGreeting />
        <ExampleCard subtitle="components/ + lib/formatTitle" />
        <Link className="text-blue-600 underline underline-offset-2 dark:text-blue-400" href={paths.tripNew}>
          New trip (app/routes/paths)
        </Link>
      </div>
    </div>
  );
}
