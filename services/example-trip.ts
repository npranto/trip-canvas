import type { TripPreview } from '@/types/schemas/trip-preview';

/** IO and external APIs live in `services/`; UI imports these, not the network directly. */
export async function fetchExampleTrip(): Promise<TripPreview> {
  return { id: 'demo', title: 'Example weekend' };
}
