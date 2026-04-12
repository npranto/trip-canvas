import Link from 'next/link';
import { paths } from '@/app/routes/paths';
import { typography } from '@/lib/design/tokens';
import { cn } from '@/lib/utils/cn';

export const layoutContainerClass = 'mx-auto w-full max-w-5xl px-4 sm:px-6';

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b border-edge bg-background">
        <div
          className={`${layoutContainerClass} flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between`}
        >
          <Link
            href={paths.home}
            className={cn(typography['body-large'], 'font-semibold tracking-tight text-foreground')}
          >
            TripCanvas
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Primary">
            <Link
              href={paths.home}
              className={cn(
                typography['body-small'],
                'text-fg-muted underline-offset-4 hover:text-foreground hover:underline',
              )}
            >
              Home
            </Link>
            <Link
              href={paths.tripNew}
              className={cn(
                typography['body-small'],
                'text-fg-muted underline-offset-4 hover:text-foreground hover:underline',
              )}
            >
              New trip
            </Link>
            <Link
              href={paths.trips}
              className={cn(
                typography['body-small'],
                'text-fg-muted underline-offset-4 hover:text-foreground hover:underline',
              )}
            >
              Saved trips
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className={`${layoutContainerClass} flex min-h-0 flex-1 flex-col`}>{children}</div>
      </main>

      <footer className="mt-auto shrink-0 border-t border-edge bg-background">
        <div
          className={`${layoutContainerClass} flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between`}
        >
          <p className={cn(typography['body-small'], 'w-full text-center text-fg-muted')}>
            © {new Date().getFullYear()} TripCanvas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
