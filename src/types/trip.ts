/** Domain types for trips (ids, previews, full plan — extend as features land). */
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type TravelerType = 'solo' | 'couple' | 'family' | 'friends' | 'business';

export type TripBudget = 'budget' | 'moderate' | 'premium' | 'luxury';

export interface TripAssumption {
  id: string;
  label: string;
  value: string;
  confidence: ConfidenceLevel;
  editable: boolean;
}

export interface ActivityItemModel {
  id: string;
  timeBucket?: string;
  title: string;
  description?: string;
  costLevel?: '$' | '$$' | '$$$';
  tags?: string[];
}

export interface ItineraryDayModel {
  id: string;
  dayNumber: number;
  title: string;
  summary?: string;
  activities: ActivityItemModel[];
}

export interface HotelRecommendationModel {
  id: string;
  name: string;
  neighborhood: string;
  priceRange: string;
  reason: string;
  imageUrl?: string;
  href?: string;
  isPlaceholder?: boolean;
}

export interface FlightRecommendationModel {
  id: string;
  route: string;
  airline?: string;
  stops?: string;
  priceEstimate?: string;
  reason: string;
  href?: string;
  isPlaceholder?: boolean;
}

export interface TripModel {
  id: string;
  title: string;
  destination: string;
  durationLabel: string;
  budget: TripBudget;
  travelerType: TravelerType;
  summary: string;
  createdAt: string;
  assumptions: TripAssumption[];
  itinerary: ItineraryDayModel[];
  hotels: HotelRecommendationModel[];
  flights: FlightRecommendationModel[];
  rationale?: string;
  confidence: ConfidenceLevel;
}

export type TripId = string;

export type TripPreview = {
  id: TripId;
  title: string;
};
