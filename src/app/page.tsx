import Link from 'next/link';
import { paths } from '@/app/routes/paths';
import { ExampleCard } from '@/components/ExampleCard';
import { ExampleGreeting } from '@/features/example-feature/ExampleGreeting';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 py-8 text-center sm:py-16 sm:text-left">
      <div className="mx-auto flex w-full flex-col gap-8">
        <div className="space-y-2">
          <h1 className={cn(typography.h1, 'text-foreground')}>TripCanvas</h1>
        </div>
        <p className={cn(typography['body-large'], 'text-fg-secondary')}>
          TripCanvas is an AI-native travel planning prototype that turns a user&apos;s natural-language trip request
          into a structured, editable travel plan. Instead of behaving like a raw chatbot, it combines conversational
          input, itinerary generation, recommendation cards, and clear confidence/fallback states to help users move
          from vague travel intent to a usable trip plan. It is designed as the frontend foundation for a future booking
          companion rather than a one-off AI wrapper.
        </p>

        <ExampleGreeting />
        <ExampleCard subtitle="components/ + lib/utils/format" />
        <Link
          className={cn(
            typography['body-small'],
            'text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover',
          )}
          href={paths.tripNew}
        >
          New trip (app/routes/paths)
        </Link>
      </div>
    </div>
  );
}
