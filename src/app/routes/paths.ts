/** Central URL path strings; use from links and redirects. */
export const paths = {
  home: '/',
  tripNew: '/trip/new',
  trips: '/trips',
} as const;

/** Canonical trip canvas URL for a saved or generated trip id. */
export function tripPath(tripId: string): string {
  return `/trip/${encodeURIComponent(tripId)}`;
}
