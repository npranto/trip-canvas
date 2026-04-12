import type { Metadata } from 'next';
import { ChevronLeft, ChevronRight, FolderOpen, Star } from 'lucide-react';
import { UiPrimitiveRow, UiPrimitiveSection } from './ui-primitive-section';
import { Button, type ButtonVariant } from '@/components/ui/button';
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
    </div>
  );
}
