import type { Metadata } from 'next';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, FolderOpen, MapPin, Search, Star } from 'lucide-react';
import { UiPrimitiveRow, UiPrimitiveSection } from './ui-primitive-section';
import { Button, type ButtonVariant } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';

export const metadata: Metadata = {
  title: 'UI primitives',
  description: 'TripCanvas UI primitives for visual review and QA.',
};

const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'link'];

export default function UiPrimitivesPage() {
  return (
    <div className="flex flex-1 flex-col pb-16">
      <div className="space-y-2 py-8">
        <h1 className={cn(typography.h1, 'text-foreground')}>UI primitives</h1>
        <p className={cn(typography.body, 'max-w-2xl text-fg-secondary')}>
          Living gallery for shared components under{' '}
          <code className="font-mono text-sm text-foreground">components/ui</code>. Add new sections here as primitives
          land.
        </p>
      </div>

      <UiPrimitiveSection
        title="Button"
        description="Variants, sizes, icons, loading, disabled, and composition patterns from product mockups (e.g. pill chips via secondary + rounded-full)."
      >
        <UiPrimitiveRow label="Variants">
          {variants.map((v) => (
            <Button key={v} variant={v} size="md">
              {v}
            </Button>
          ))}
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Favorite">
            <Star className="size-4" aria-hidden />
          </Button>
        </UiPrimitiveRow>

        <UiPrimitiveRow label="With icons">
          <Button variant="outline" leftIcon={<FolderOpen className="size-4" aria-hidden />}>
            View saved trips
          </Button>
          <Button variant="primary" rightIcon={<ChevronRight className="size-4" aria-hidden />}>
            Continue
          </Button>
          <Button variant="secondary" leftIcon={<Star className="size-4" aria-hidden />} size="sm">
            Featured
          </Button>
          <Button
            variant="secondary"
            leftIcon={<ChevronLeft className="size-4" aria-hidden />}
            rightIcon={<ChevronRight className="size-4" aria-hidden />}
            size="lg"
          >
            Page 5
          </Button>
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Pill / filter (mockups)">
          <Button variant="secondary" size="sm" className="rounded-full px-4">
            Make it cheaper
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full px-4">
            More relaxed
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full px-4">
            Family friendly
          </Button>
        </UiPrimitiveRow>

        <UiPrimitiveRow label="States">
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" isLoading>
            Loading
          </Button>
          <Button variant="outline" isLoading>
            Saving…
          </Button>
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Ghost row actions (mockups)">
          <Button variant="ghost" size="sm">
            View
          </Button>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            Delete
          </Button>
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Wide CTA">
          <Button variant="primary" size="lg" className="w-full min-w-48 max-w-md sm:w-auto sm:min-w-80">
            Let&apos;s go!
          </Button>
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Danger">
          <Button variant="danger">Remove trip</Button>
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Link">
          <Button variant="link" size="sm">
            Small link
          </Button>
          <Button variant="link" size="md">
            Medium link
          </Button>
          <Button variant="link" size="lg">
            Large link
          </Button>
        </UiPrimitiveRow>
      </UiPrimitiveSection>

      <UiPrimitiveSection
        title="Input"
        description="Single-line fields from mockups: hero search, labeled trip form rows, optional prefix/suffix, hint and error text. Uses brand focus ring and tc-slate-200 border per spec §8.2."
      >
        <UiPrimitiveRow label="Sizes">
          <Input size="sm" placeholder="Small" className="w-40" />
          <Input size="md" placeholder="Medium" className="w-40" />
          <Input size="lg" placeholder="Large" className="w-48" />
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Variants">
          <Input variant="default" placeholder="Default variant" className="w-56" />
          <Input variant="search" placeholder="Search variant (hero scale type)" className="w-full min-w-0 max-w-xl" />
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Landing prompt (mockup)">
          <Input
            variant="search"
            size="lg"
            className="w-full min-w-0 max-w-2xl"
            placeholder='e.g. "a romantic getaway in Paris for a week in June"'
            aria-label="Describe your trip"
          />
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Trip form (mockup)">
          <Input label="Destination" defaultValue="Rome" className="w-52" />
          <Input label="Dates" defaultValue="September" hint="Month or specific range." className="w-52" />
          <Input label="Duration" defaultValue="5 days" className="w-40" />
          <Input label="Budget" defaultValue="Moderate" className="w-44" />
        </UiPrimitiveRow>

        <UiPrimitiveRow label="Prefix / suffix">
          <Input size="sm" prefix="$" placeholder="0.00" className="w-32" aria-label="Amount" />
          <Input
            size="md"
            suffix={<Search className="size-4" aria-hidden />}
            placeholder="Search"
            className="w-44"
            aria-label="Search"
          />
          <Input
            size="lg"
            prefix={<MapPin className="size-4" aria-hidden />}
            suffix={<ChevronDown className="size-4" aria-hidden />}
            defaultValue="Couple"
            className="w-48"
            aria-label="Travellers"
          />
        </UiPrimitiveRow>

        <UiPrimitiveRow label="States">
          <Input placeholder="Default" className="w-40" />
          <Input placeholder="Disabled" disabled className="w-40" />
          <Input label="Invalid" defaultValue="" error="This field is required." className="w-56" />
          <Input placeholder="aria-invalid" aria-invalid className="w-44" />
        </UiPrimitiveRow>

        <UiPrimitiveRow label="With icons (read-only style)">
          <Input
            prefix={<Calendar className="size-4" aria-hidden />}
            defaultValue="June 12 – June 19"
            readOnly
            className="w-56"
            aria-label="Trip dates"
          />
        </UiPrimitiveRow>
      </UiPrimitiveSection>
    </div>
  );
}
