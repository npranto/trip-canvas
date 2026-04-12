/** Domain types for trips (ids, previews, full plan — extend as features land). */
export type TripId = string;

export type TripPreview = {
  id: TripId;
  title: string;
};
