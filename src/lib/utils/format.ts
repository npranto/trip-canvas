/** Small string helpers — `lib/` stays free of React and IO. */
export function formatTitle(value: string): string {
  const t = value.trim();
  if (!t) return '';
  return t[0].toUpperCase() + t.slice(1).toLowerCase();
}
