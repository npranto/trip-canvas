# TripCanvas — Full Implementation-Ready Component Spec Document

## 1. Purpose

This document defines the implementation blueprint for TripCanvas. It is structured in build order:

1. design tokens
2. UI primitives
3. shared layout blocks
4. feature components
5. full pages
6. implementation conventions
7. acceptance checklist

The goal is to make each piece buildable one by one without rethinking naming, composition, or styling strategy later.

---

## 2. Product framing

TripCanvas is an AI-native travel planning product. The UI should feel structured, trustworthy, calm, and editable. It should not feel like a generic chatbot shell. The output must look like a productized plan with cards, timelines, assumptions, confidence states, and next actions.

Core product principles:

- product-first, not transcript-first
- editable over magical
- confidence and fallback are visible
- strong information hierarchy
- responsive by default
- all critical interactions support loading, empty, error, and partial states

---

## 3. Stack assumptions

- Next.js App Router
- TypeScript
- Tailwind CSS
- class-variance-authority
- clsx
- tailwind-merge
- optional Radix primitives for dialog, tabs, tooltip, accordion, sheet
- optional Lucide icons

Suggested utilities:

- `cn()` helper for class merging
- CVA for variants
- domain types in `src/types`
- data access isolated from presentational components

---

## 4. Project structure

```txt
src/
  app/
    layout.tsx
    page.tsx
    trip/
      new/
        page.tsx
      [tripId]/
        page.tsx
    trips/
      page.tsx

  components/
    ui/
    layout/
    marketing/
    trip-request/
    trip-generation/
    trip-results/
    itinerary/
    recommendations/
    refinement/
    saved-trips/
    trip-actions/

  lib/
    utils/
      cn.ts
      format.ts
    design/
      tokens.ts

  types/
    trip.ts
    ui.ts
```

---

# 5. Design tokens

## 5.1 Token philosophy

Use semantic tokens, not one-off colors. Components should depend on semantic roles like surface, border, primary action, or warning state.

---

## 5.2 Color tokens

### Brand

- `--color-brand-primary`
- `--color-brand-primary-hover`
- `--color-brand-primary-soft`
- `--color-brand-secondary`
- `--color-brand-accent`

### Neutrals

- `--color-bg-canvas`
- `--color-bg-surface`
- `--color-bg-subtle`
- `--color-border-default`
- `--color-border-strong`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-muted`
- `--color-text-inverse`

**Tailwind (`globals.css` `@theme`):** register aliases so class names stay readable. Examples: `--color-canvas` → `bg-canvas`, `--color-surface` → `bg-surface`, `--color-surface-subtle` → `bg-surface-subtle`, `--color-edge` / `--color-edge-strong` → `border-edge` / `border-edge-strong`, `--color-fg-secondary` / `--color-fg-muted` / `--color-fg-inverse` → `text-fg-*` (and `bg-fg-*` if needed), `--color-fallback-surface` / `--color-fallback-edge` → `bg-fallback-surface` / `border-fallback-edge`. Do not register `--color-bg-*`, `--color-border-*`, `--color-text-*`, or `--color-fallback-bg` / `--color-fallback-border` directly in `@theme` — that produces `bg-bg-*`, `border-border-*`, `text-text-*`, and `bg-fallback-bg`. Primary body text uses `text-foreground` (`--color-foreground` → `--color-text-primary`).

### Feedback

- `--color-success`
- `--color-warning`
- `--color-error`
- `--color-info`

### AI / confidence

- `--color-confidence-high`
- `--color-confidence-medium`
- `--color-confidence-low`
- `--color-fallback-bg`
- `--color-fallback-border`

### Suggested mapping

```ts
export const tripCanvasColors = {
  brand: {
    primary: '#1D73E8',
    primaryHover: '#155FCC',
    primarySoft: '#EAF3FF',
    secondary: '#213A63',
    accent: '#7EC8F8',
  },
  neutral: {
    canvas: '#F4F7FB',
    surface: '#FFFFFF',
    subtle: '#F8FAFC',
    border: '#D9E2EC',
    borderStrong: '#BCCCDC',
    textPrimary: '#10233E',
    textSecondary: '#37506E',
    textMuted: '#6B7C93',
    textInverse: '#FFFFFF',
  },
  feedback: {
    success: '#1F9D63',
    warning: '#C58917',
    error: '#D14343',
    info: '#2D7FF9',
  },
  confidence: {
    high: '#1F9D63',
    medium: '#D89B1C',
    low: '#D14343',
    fallbackBg: '#FFF8E8',
    fallbackBorder: '#F1D18A',
  },
} as const;
```

### Tailwind extension direction

```ts
colors: {
  tc: {
    blue: {
      50: '#EAF3FF',
      100: '#D8E9FF',
      500: '#1D73E8',
      600: '#155FCC',
      700: '#124EAB',
    },
    slate: {
      50: '#F8FAFC',
      100: '#F4F7FB',
      200: '#D9E2EC',
      300: '#BCCCDC',
      500: '#6B7C93',
      700: '#37506E',
      900: '#10233E',
    },
    success: '#1F9D63',
    warning: '#C58917',
    danger: '#D14343',
    info: '#2D7FF9',
  },
}
```

---

## 5.3 Typography tokens

### Roles

- `display`
- `h1`
- `h2`
- `h3`
- `body`
- `body-large`
- `body-small`
- `label`
- `caption`

### Suggested scale

```ts
export const typography = {
  display: 'text-4xl md:text-5xl font-semibold tracking-tight',
  h1: 'text-3xl md:text-4xl font-semibold tracking-tight',
  h2: 'text-2xl md:text-3xl font-semibold tracking-tight',
  h3: 'text-xl font-semibold',
  body: 'text-base leading-7',
  'body-large': 'text-lg leading-8',
  'body-small': 'text-sm leading-6',
  label: 'text-sm font-medium',
  caption: 'text-xs font-medium uppercase tracking-wide',
} as const;
```

### Usage rules

- landing hero: display
- route titles: h1
- section titles: h2
- card titles: h3
- body paragraphs: body or body-small
- metadata/chips/helper labels: label or caption

---

## 5.4 Spacing tokens

Use an 8px base system.

- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px
- `10` = 40px
- `12` = 48px
- `16` = 64px

Usage:

- card padding: 16–24
- page section spacing: 32–64
- form gaps: 12–16
- itinerary item gaps: 12–16

---

## 5.5 Radius tokens

- `radius-sm` = 8px
- `radius-md` = 10px
- `radius-lg` = 14px
- `radius-xl` = 20px
- `radius-full` = 9999px

Usage:

- chips / small inputs: sm
- buttons / fields: md
- cards: lg
- featured panels / hero blocks: xl

---

## 5.6 Shadow tokens

- `shadow-xs` = subtle border emphasis
- `shadow-sm` = standard card
- `shadow-md` = elevated card / dialog
- `shadow-focus` = focus ring pattern

Suggested visual direction:

- no heavy shadows
- surfaces should feel crisp, clean, airy

---

## 5.7 Motion tokens

- `fast` = 120ms
- `normal` = 180ms
- `slow` = 280ms

Motion usage:

- hover/focus transitions
- accordion expansion
- loading skeleton shimmer
- drawer/modal entrance

Reduced motion must be respected.

---

## 5.8 Container tokens

- `container.marketing` = `max-w-7xl`
- `container.app` = `max-w-6xl`
- `container.narrow` = `max-w-3xl`
- `container.wide` = `max-w-[1400px]`

---

# 6. Tailwind setup spec

## 6.1 `cn()` helper

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 6.2 Recommended dependencies

```bash
npm i class-variance-authority clsx tailwind-merge lucide-react
```

Optional:

```bash
npm i @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-accordion
```

## 6.3 Component conventions

- use forwardRef for primitives where appropriate
- expose `variant` and `size` instead of many booleans
- keep domain logic out of primitives
- colocate feature-specific subcomponents with feature folders

---

# 7. Core domain types

```ts
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
```

---

# 8. UI primitives

Each primitive below includes purpose, component name, props, states, accessibility notes, and styling guidance.

---

## 8.1 Button

### File

`components/ui/button.tsx`

### Purpose

Primary action trigger across the product.

### Props

```ts
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

### States

- default
- hover
- focus-visible
- disabled
- loading

### Visual behavior

- primary: solid blue background
- secondary: muted blue surface
- outline: white surface with border
- ghost: minimal text button
- danger: destructive
- link: text-only inline action

### Accessibility

- preserve visible focus ring
- loading buttons remain announced with text or `aria-busy`
- icon-only buttons need `aria-label`

### Tailwind direction

- rounded-md
- font-medium
- transition-colors
- disabled opacity + pointer-events-none

---

## 8.2 Input

### File

`components/ui/input.tsx`

### Purpose

Single-line text input.

### Props

```ts
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
```

### States

- default
- hover
- focus
- invalid
- disabled

### Accessibility

- associate label and hint/error ids
- invalid state should use `aria-invalid`

### Styling direction

- bg-white
- border tc-slate-200
- rounded-md
- focus ring in brand blue

---

## 8.3 Textarea

### File

`components/ui/textarea.tsx`

### Purpose

Primary prompt entry and freeform refinements.

### Props

```ts
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  resize?: 'none' | 'vertical' | 'auto';
}
```

### Variants

- default
- prompt

### Special requirements

- prompt variant should feel large and inviting
- minimum height around 120–160px

---

## 8.4 Select

### File

`components/ui/select.tsx`

### Purpose

Structured helper inputs.

### Props

Simple wrapper or custom implementation depending on chosen library.

### Usage

- traveler type
- budget
- month/date
- duration presets

---

## 8.5 Badge

### File

`components/ui/badge.tsx`

### Purpose

Compact metadata and status indicator.

### Variants

- default
- info
- success
- warning
- danger
- subtle
- confidenceHigh
- confidenceMedium
- confidenceLow

### Uses

- Moderate budget
- Couple
- 5 days
- confidence labels
- quick action tags

---

## 8.6 Card

### File

`components/ui/card.tsx`

### Purpose

Foundational surface wrapper.

### Subcomponents

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

### Variants

- default
- elevated
- interactive
- muted
- outline

### Styling direction

- white or subtle surface
- rounded-lg
- border tc-slate-200
- padding 16–24

---

## 8.7 Alert

### File

`components/ui/alert.tsx`

### Purpose

System messaging for info, warning, error, success.

### Variants

- info
- warning
- error
- success

### Uses

- AI-generated notice
- incomplete result warning
- generation failed
- save successful

---

## 8.8 Skeleton

### File

`components/ui/skeleton.tsx`

### Purpose

Loading placeholders for AI-driven latency.

### Variants to support through composition

- text line
- block
- itinerary day
- recommendation card
- saved trip row

---

## 8.9 Divider

### File

`components/ui/divider.tsx`

### Purpose

Separate sections visually without heavy chrome.

---

## 8.10 IconButton

### File

`components/ui/icon-button.tsx`

### Purpose

Compact icon action.

### Uses

- share
- duplicate
- archive
- delete
- copy

---

## 8.11 Dialog

### File

`components/ui/dialog.tsx`

### Purpose

Modal workflows.

### Uses

- edit assumptions
- confirm delete
- share/export

---

## 8.12 Tabs

### File

`components/ui/tabs.tsx`

### Uses

- overview vs details
- latest plan vs refinements
- itinerary vs recommendations on constrained screens

---

## 8.13 Accordion

### File

`components/ui/accordion.tsx`

### Uses

- day details
- rationale details
- FAQ content

---

## 8.14 Tooltip

### File

`components/ui/tooltip.tsx`

### Uses

- explain confidence labels
- explain inferred assumptions

---

## 8.15 Sheet

### File

`components/ui/sheet.tsx`

### Uses

- mobile assumptions panel
- mobile refinement history

---

# 9. Shared layout blocks

---

## 9.1 AppShell

### File

`components/layout/app-shell.tsx`

### Purpose

Global route shell.

### Responsibilities

- page background
- top navigation
- optional footer
- page spacing
- route-level trust consistency

### Props

```ts
interface AppShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showNav?: boolean;
}
```

---

## 9.2 PageContainer

### File

`components/layout/page-container.tsx`

### Purpose

Reusable max-width wrapper.

### Props

```ts
interface PageContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'app' | 'marketing' | 'wide';
  className?: string;
}
```

---

## 9.3 TopNav

### File

`components/layout/top-nav.tsx`

### Purpose

Persistent top navigation.

### Content

- logo
- home
- saved trips
- optional sign in later

### Behavior

- sticky optional
- compact on mobile

---

## 9.4 SectionBlock

### File

`components/layout/section-block.tsx`

### Purpose

Standardized heading + content wrapper.

### Props

```ts
interface SectionBlockProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}
```

---

## 9.5 Footer

### File

`components/layout/footer.tsx`

### Purpose

Simple footer for landing and marketing experience.

---

# 10. Marketing blocks

---

## 10.1 LogoMark

### File

`components/marketing/logo-mark.tsx`

### Purpose

Small brand icon used in header and loading states.

---

## 10.2 BrandWordmark

### File

`components/marketing/brand-wordmark.tsx`

### Purpose

Text brand treatment.

---

## 10.3 HeroSection

### File

`components/marketing/hero-section.tsx`

### Purpose

Landing hero with value proposition and top-level CTA.

### Content

- headline
- subcopy
- prompt teaser or fake input affordance
- primary CTA to `/trip/new`
- secondary CTA to `/trips`

### Props

```ts
interface HeroSectionProps {
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}
```

---

## 10.4 PromptExampleList

### File

`components/marketing/prompt-example-list.tsx`

### Purpose

Reduce blank-state anxiety with clickable examples.

### Item shape

```ts
interface PromptExample {
  id: string;
  label: string;
  prompt: string;
}
```

---

## 10.5 TrustNotice

### File

`components/marketing/trust-notice.tsx`

### Purpose

Present AI expectation-setting clearly.

### Content examples

- Plans may include assumptions
- Recommendations are editable
- Verify details before booking

---

# 11. Trip request blocks

---

## 11.1 PromptTextarea

### File

`components/trip-request/prompt-textarea.tsx`

### Purpose

High-emphasis natural language trip prompt input.

### Props

```ts
interface PromptTextareaProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  examples?: string[];
  isSubmitting?: boolean;
}
```

### UX requirements

- large comfortable textarea
- helper copy beneath
- optional example chips below

---

## 11.2 TripStructuredFields

### File

`components/trip-request/trip-structured-fields.tsx`

### Purpose

Optional helper inputs that refine AI output.

### Fields

- destination
- duration
- date/month
- traveler type
- budget
- interests

### Props

```ts
interface TripStructuredFieldsValue {
  destination?: string;
  duration?: string;
  dateLabel?: string;
  travelerType?: TravelerType;
  budget?: TripBudget;
  interests?: string[];
}

interface TripStructuredFieldsProps {
  value: TripStructuredFieldsValue;
  onChange: (next: TripStructuredFieldsValue) => void;
  errors?: Partial<Record<keyof TripStructuredFieldsValue, string>>;
}
```

---

## 11.3 TripFormHintList

### File

`components/trip-request/trip-form-hint-list.tsx`

### Purpose

Help user write a good request.

### Content

- mention destination or trip type
- include travel window if known
- note budget and interests

---

## 11.4 TripSubmitBar

### File

`components/trip-request/trip-submit-bar.tsx`

### Purpose

Bottom action area for form submission.

### Content

- primary submit button
- optional reset/clear
- optional trust note
- inline loading state

---

## 11.5 TripRequestForm

### File

`components/trip-request/trip-request-form.tsx`

### Purpose

Composes all intake controls on `/trip/new`.

### Responsibilities

- own local form layout
- hand data upward or submit callback
- show validation state
- remain visually simple and focused

### Props

```ts
interface TripRequestFormProps {
  defaultValues?: {
    prompt?: string;
    destination?: string;
    duration?: string;
    dateLabel?: string;
    travelerType?: TravelerType;
    budget?: TripBudget;
    interests?: string[];
  };
  onSubmit: (payload: unknown) => Promise<void> | void;
  isSubmitting?: boolean;
}
```

---

# 12. Generation state blocks

---

## 12.1 GenerationProgress

### File

`components/trip-generation/generation-progress.tsx`

### Purpose

Communicate AI processing stages.

### Stages

- understanding your request
- inferring assumptions
- drafting your itinerary
- preparing recommendations

### Props

```ts
interface GenerationProgressProps {
  currentStep: number;
  steps: string[];
}
```

---

## 12.2 TripGenerationState

### File

`components/trip-generation/trip-generation-state.tsx`

### Purpose

Reusable generation/loading/failure wrapper.

### Variants

- loading
- retrying
- error
- fallback

### Props

```ts
interface TripGenerationStateProps {
  status: 'loading' | 'retrying' | 'error' | 'fallback';
  title?: string;
  description?: string;
  onRetry?: () => void;
}
```

---

## 12.3 RetryPanel

### File

`components/trip-generation/retry-panel.tsx`

### Purpose

Explicit recovery path when generation fails.

---

## 12.4 IncompleteOutputNotice

### File

`components/trip-generation/incomplete-output-notice.tsx`

### Purpose

Show where result is partial without breaking trust.

---

# 13. Trip result blocks

---

## 13.1 TripResultsLayout

### File

`components/trip-results/trip-results-layout.tsx`

### Purpose

Main composition shell for `/trip/[tripId]`.

### Regions

- top summary area
- main left column
- right rail
- sticky actions row

### Responsive behavior

- desktop: 2-column layout
- tablet: stacked with right rail below summary
- mobile: single column

### Props

```ts
interface TripResultsLayoutProps {
  summary: React.ReactNode;
  main: React.ReactNode;
  sidebar?: React.ReactNode;
  actions?: React.ReactNode;
}
```

---

## 13.2 TripMetaRow

### File

`components/trip-results/trip-meta-row.tsx`

### Purpose

Compact key/value metadata line or badge cluster.

### Uses

- destination
- duration
- traveler type
- budget
- created date

---

## 13.3 TripSummaryCard

### File

`components/trip-results/trip-summary-card.tsx`

### Purpose

Primary summary block for a trip.

### Displays

- title
- destination
- duration
- traveler type
- budget label
- summary paragraph

### Props

```ts
interface TripSummaryCardProps {
  trip: Pick<TripModel, 'title' | 'destination' | 'durationLabel' | 'travelerType' | 'budget' | 'summary'>;
}
```

### States

- complete
- partial summary
- loading skeleton

---

## 13.4 AssumptionsCard

### File

`components/trip-results/assumptions-card.tsx`

### Purpose

Expose inferred assumptions transparently.

### Content

- list of assumptions
- confidence badge on each or grouped
- edit assumptions CTA

### Props

```ts
interface AssumptionsCardProps {
  assumptions: TripAssumption[];
  onEdit?: () => void;
}
```

---

## 13.5 BudgetInterpretationCard

### File

`components/trip-results/budget-interpretation-card.tsx`

### Purpose

Translate loose budget language into something understandable.

### Content

- selected budget tier
- interpretation text
- caveat if inferred from prompt only

---

## 13.6 ConfidenceCard

### File

`components/trip-results/confidence-card.tsx`

### Purpose

Explain certainty and uncertainty.

### Content

- overall confidence label
- known constraints
- inferred assumptions
- guidance on what to verify

---

## 13.7 RationaleCard

### File

`components/trip-results/rationale-card.tsx`

### Purpose

Explain why the plan looks the way it does.

### Content

- why this pacing
- why this neighborhood/hotel direction
- how budget affected recommendations

---

# 14. Itinerary blocks

---

## 14.1 ItinerarySection

### File

`components/itinerary/itinerary-section.tsx`

### Purpose

Wrapper around all itinerary day content.

### Props

```ts
interface ItinerarySectionProps {
  days: ItineraryDayModel[];
}
```

---

## 14.2 ActivityItem

### File

`components/itinerary/activity-item.tsx`

### Purpose

Atomic activity row used inside a day card.

### Displays

- optional time bucket
- title
- short description
- cost tag
- supporting tags

### Props

```ts
interface ActivityItemProps {
  activity: ActivityItemModel;
}
```

---

## 14.3 ItineraryDayCard

### File

`components/itinerary/itinerary-day-card.tsx`

### Purpose

Core planning card for each day.

### Displays

- day number
- day title
- summary
- activity list

### Props

```ts
interface ItineraryDayCardProps {
  day: ItineraryDayModel;
  defaultExpanded?: boolean;
}
```

### States

- complete
- no activities / fallback
- collapsed
- expanded

### UX guidance

- on mobile, consider accordion behavior
- preserve scanability on desktop

---

## 14.4 DayTimeline

### File

`components/itinerary/day-timeline.tsx`

### Purpose

Optional structured visual timeline treatment.

---

## 14.5 EmptyDayState

### File

`components/itinerary/empty-day-state.tsx`

### Purpose

Graceful fallback when a day lacks enough detail.

---

# 15. Recommendation blocks

---

## 15.1 RecommendationSection

### File

`components/recommendations/recommendation-section.tsx`

### Purpose

Wrap hotel and flight recommendation areas.

---

## 15.2 RecommendationReason

### File

`components/recommendations/recommendation-reason.tsx`

### Purpose

Consistent styling for “why recommended” copy.

---

## 15.3 PlaceholderRecommendationNotice

### File

`components/recommendations/placeholder-recommendation-notice.tsx`

### Purpose

Clarify when recommendations are mock or lightly inferred.

---

## 15.4 HotelRecommendationCard

### File

`components/recommendations/hotel-recommendation-card.tsx`

### Purpose

Display a hotel recommendation or placeholder.

### Displays

- image
- hotel name
- neighborhood
- price range
- reason recommended
- CTA

### Props

```ts
interface HotelRecommendationCardProps {
  hotel: HotelRecommendationModel;
}
```

### States

- placeholder
- live recommendation
- missing image

---

## 15.5 FlightRecommendationCard

### File

`components/recommendations/flight-recommendation-card.tsx`

### Purpose

Display a flight option or placeholder.

### Displays

- route
- airline
- stop count
- price estimate
- reason recommended
- CTA

### Props

```ts
interface FlightRecommendationCardProps {
  flight: FlightRecommendationModel;
}
```

---

# 16. Refinement blocks

---

## 16.1 RefinementActionChip

### File

`components/refinement/refinement-action-chip.tsx`

### Purpose

Quick refinement shortcut control.

### Variants

- default
- active
- loading

### Uses

- cheaper
- fewer activities
- family friendly
- closer to center

---

## 16.2 RefinementQuickActions

### File

`components/refinement/refinement-quick-actions.tsx`

### Purpose

Group of quick refinements.

### Props

```ts
interface RefinementQuickAction {
  id: string;
  label: string;
  prompt: string;
}

interface RefinementQuickActionsProps {
  actions: RefinementQuickAction[];
  onSelect: (action: RefinementQuickAction) => void;
  activeId?: string;
  isLoading?: boolean;
}
```

---

## 16.3 RefinementTextarea

### File

`components/refinement/refinement-textarea.tsx`

### Purpose

Freeform refinement prompt entry.

---

## 16.4 PartialRegenerationNotice

### File

`components/refinement/partial-regeneration-notice.tsx`

### Purpose

Explain when only part of the plan changed.

---

## 16.5 RefinementVersionCard

### File

`components/refinement/refinement-version-card.tsx`

### Purpose

Show latest version context and summary of changes.

---

## 16.6 RefinementHistoryList

### File

`components/refinement/refinement-history-list.tsx`

### Purpose

Present previous refinements in reverse chronological order.

---

## 16.7 RefinementPanel

### File

`components/refinement/refinement-panel.tsx`

### Purpose

Complete refinement surface on the trip page.

### Contains

- quick actions
- freeform textarea
- submit button
- loading state
- latest version note

### Props

```ts
interface RefinementPanelProps {
  onQuickRefine: (prompt: string) => Promise<void> | void;
  onCustomRefine: (prompt: string) => Promise<void> | void;
  isLoading?: boolean;
  history?: { id: string; label: string; createdAt: string }[];
}
```

---

# 17. Saved trips blocks

---

## 17.1 SavedTripsPageHeader

### File

`components/saved-trips/saved-trips-page-header.tsx`

### Purpose

Top content block for `/trips`.

### Displays

- page title
- count if available
- CTA to create a new trip

---

## 17.2 SavedTripMetadata

### File

`components/saved-trips/saved-trip-metadata.tsx`

### Purpose

Compact metadata display inside saved trip cards.

---

## 17.3 SavedTripActions

### File

`components/saved-trips/saved-trip-actions.tsx`

### Purpose

Standard actions row.

### Contains

- view
- duplicate
- archive
- delete

---

## 17.4 SavedTripCard

### File

`components/saved-trips/saved-trip-card.tsx`

### Purpose

Display a saved trip summary in list/grid format.

### Props

```ts
interface SavedTripCardProps {
  trip: Pick<TripModel, 'id' | 'title' | 'destination' | 'createdAt' | 'durationLabel' | 'travelerType' | 'budget'>;
  onDuplicate?: (tripId: string) => void;
  onArchive?: (tripId: string) => void;
  onDelete?: (tripId: string) => void;
}
```

---

## 17.5 SavedTripList

### File

`components/saved-trips/saved-trip-list.tsx`

### Purpose

List wrapper for saved trip cards.

---

## 17.6 EmptySavedTripsState

### File

`components/saved-trips/empty-saved-trips-state.tsx`

### Purpose

Empty state with CTA back to planning flow.

---

# 18. Trip action blocks

---

## 18.1 SaveTripButton

### File

`components/trip-actions/save-trip-button.tsx`

### Purpose

Domain-specific wrapper around save action semantics.

---

## 18.2 ShareTripButton

### File

`components/trip-actions/share-trip-button.tsx`

### Purpose

Initiate share flow.

---

## 18.3 CopyLinkButton

### File

`components/trip-actions/copy-link-button.tsx`

### Purpose

Copy canonical `/trip/[tripId]` URL.

---

## 18.4 TripActionBar

### File

`components/trip-actions/trip-action-bar.tsx`

### Purpose

Sticky actions row for trip-level operations.

### Contains

- save
- share
- duplicate later if needed
- edit assumptions trigger

---

# 19. Full page specs

---

## 19.1 `/` Landing page

### Purpose

Explain product and move user into planning.

### Composition

- `AppShell`
- `PageContainer size="marketing"`
- `HeroSection`
- `PromptExampleList`
- `TrustNotice`
- optional features section
- `Footer`

### Required content

- clear value proposition
- one primary CTA to `/trip/new`
- optional CTA to `/trips`
- AI trust messaging

### Responsive behavior

- hero stacks vertically on mobile
- prompt examples wrap cleanly

### Empty/loading/error states

Not data-heavy, so mostly static.

---

## 19.2 `/trip/new`

### Purpose

Collect travel intent through prompt + optional helpers.

### Composition

- `AppShell`
- `PageContainer size="narrow"`
- route title block
- `TripRequestForm`
- optional `TrustNotice`

### UX requirements

- focused, minimal distractions
- form should not feel like a dashboard
- submit transitions into generation state or redirect flow

---

## 19.3 Generation state route transition

### Purpose

Communicate AI processing during create/refine flows.

### Composition

- `TripGenerationState`
- `GenerationProgress`
- skeleton content
- retry/error surfaces when needed

### Notes

Can be full route state or inline state within create/refine flows.

---

## 19.4 `/trip/[tripId]`

### Purpose

Canonical trip page.

### Composition

- `AppShell`
- `PageContainer size="app"`
- `TripSummaryCard`
- `TripActionBar`
- `TripResultsLayout`
  - main:
    - `ItinerarySection`
    - `RecommendationSection`

  - sidebar:
    - `AssumptionsCard`
    - `BudgetInterpretationCard`
    - `ConfidenceCard`
    - `RationaleCard`
    - `RefinementPanel`

### Functional requirements

- direct-load safe by `tripId`
- refresh-safe
- share-safe
- supports fallback notices
- supports save/share/refinement

### Responsive behavior

- summary full width
- below that main content and sidebar stack on smaller screens
- action bar may become sticky bottom action cluster on mobile if helpful

---

## 19.5 `/trips`

### Purpose

List saved trips and re-entry points.

### Composition

- `AppShell`
- `PageContainer size="app"`
- `SavedTripsPageHeader`
- `SavedTripList` or `EmptySavedTripsState`

### Requirements

- metadata preview
- view / duplicate / archive / delete affordances
- empty state CTA to `/trip/new`

---

# 20. Visual and interaction rules

## 20.1 Information hierarchy

Always order content like this on product pages:

1. trip identity
2. assumptions / confidence context
3. itinerary
4. recommendations
5. refinements and actions

## 20.2 Copy tone

- calm
- clear
- product-like
- avoids hype
- avoids overclaiming AI certainty

## 20.3 Empty states

Every list or recommendation surface needs an empty state.

Examples:

- no saved trips
- no flight options yet
- not enough detail for day 3
- no refinements yet

## 20.4 Error states

Every mutation flow must specify:

- what failed
- what user can do next
- retry action if available

## 20.5 Partial states

Important for AI products.

Examples:

- itinerary generated but recommendations incomplete
- assumptions inferred with low confidence
- one section regenerated after refinement, not full trip

---

# 21. Accessibility requirements

## Global

- keyboard reachable controls
- visible focus ring
- no color-only meaning
- sufficient contrast
- reduced motion support

## Inputs

- explicit labels
- hint text linked by `aria-describedby`
- errors linked accessibly

## Loading

- use polite live regions for long-running generation where appropriate
- avoid motion overload

## Dialogs / sheets / accordions / tabs

- rely on accessible primitives or implement WAI-ARIA patterns correctly

---

# 22. Testing requirements by layer

## Primitives

- renders variants
- forwards refs when applicable
- disabled/loading states
- accessibility labels/focus

## Feature components

- renders provided model data correctly
- empty/fallback states
- button callbacks fire
- loading state visible

## Pages

- landing renders CTA links
- trip/new submits with valid payload
- trip/[tripId] renders summary + itinerary + sidebar
- trips page handles empty + populated state

## End-to-end critical path

- user visits `/`
- starts trip on `/trip/new`
- submits request
- sees generation state
- lands on `/trip/[tripId]`
- refines result
- saves trip
- sees trip in `/trips`

---

# 23. Build order

## Phase 1 — foundation

- Tailwind config + token mapping
- `cn()` helper
- `Button`
- `Input`
- `Textarea`
- `Select`
- `Badge`
- `Card`
- `Alert`
- `Skeleton`

## Phase 2 — shell

- `AppShell`
- `PageContainer`
- `TopNav`
- `SectionBlock`
- `Footer`

## Phase 3 — landing and intake

- `HeroSection`
- `PromptExampleList`
- `TrustNotice`
- `PromptTextarea`
- `TripStructuredFields`
- `TripFormHintList`
- `TripSubmitBar`
- `TripRequestForm`

## Phase 4 — generation and result system

- `GenerationProgress`
- `TripGenerationState`
- `RetryPanel`
- `IncompleteOutputNotice`
- `TripMetaRow`
- `TripSummaryCard`
- `AssumptionsCard`
- `BudgetInterpretationCard`
- `ConfidenceCard`
- `RationaleCard`

## Phase 5 — itinerary and recommendations

- `ActivityItem`
- `ItineraryDayCard`
- `ItinerarySection`
- `EmptyDayState`
- `RecommendationReason`
- `HotelRecommendationCard`
- `FlightRecommendationCard`
- `RecommendationSection`
- `PlaceholderRecommendationNotice`

## Phase 6 — refinement and saved trips

- `RefinementActionChip`
- `RefinementQuickActions`
- `RefinementTextarea`
- `RefinementVersionCard`
- `RefinementHistoryList`
- `PartialRegenerationNotice`
- `RefinementPanel`
- `SavedTripsPageHeader`
- `SavedTripMetadata`
- `SavedTripActions`
- `SavedTripCard`
- `SavedTripList`
- `EmptySavedTripsState`
- `TripActionBar`
- `SaveTripButton`
- `ShareTripButton`
- `CopyLinkButton`

## Phase 7 — full pages

- `/`
- `/trip/new`
- `/trip/[tripId]`
- `/trips`

---

# 24. Definition of done

A component or page is considered done when:

- semantic structure is correct
- all planned states are handled
- variants are consistent with token system
- keyboard/focus behavior is correct
- mobile layout works
- no hardcoded one-off styling that should be tokenized
- prop API is stable and understandable
- tests cover critical behavior

---

# 25. Final implementation rules

- primitives are generic
- feature components understand TripCanvas domain
- pages orchestrate data and mutations
- no raw chat transcript UI for core results
- confidence and fallback must always be representable in the UI
- preserve canonical route structure: `/`, `/trip/new`, `/trip/[tripId]`, `/trips`
- optimize for iterative building: each component should be shippable independently

---

# 26. Suggested next execution step

Build in this exact order:

1. Tailwind token setup
2. `cn()` helper
3. all `ui/` primitives
4. all `layout/` blocks
5. landing and trip request components
6. generation state components
7. result components
8. itinerary and recommendations
9. refinement components
10. saved trips components
11. full pages
12. tests and polish
