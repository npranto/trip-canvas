import { render, screen } from '@testing-library/react';
import { AppShell, containerClass } from '@/components/layout/AppShell';

describe('AppShell', () => {
  it('renders header, main, and footer landmarks with page content', () => {
    render(
      <AppShell>
        <p>Smoke content</p>
      </AppShell>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Smoke content')).toBeInTheDocument();
  });

  it('exports a shared container class for max-width alignment', () => {
    expect(containerClass).toContain('max-w-5xl');
    expect(containerClass).toContain('mx-auto');
  });
});
