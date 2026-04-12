import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';
import { fetchExampleTrip } from '@/services/example-trip';

/** Feature-local UI: may call `services/`, not raw external APIs from the client. */
export async function ExampleGreeting() {
  const trip = await fetchExampleTrip();
  return (
    <p className={cn(typography['body-large'], 'text-foreground')}>
      Example feature → service: <span className={cn(typography.label, 'text-foreground')}>{trip.title}</span>
    </p>
  );
}
