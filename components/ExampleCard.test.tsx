import { render, screen } from '@testing-library/react';

import { ExampleCard } from '@/components/ExampleCard';

describe('ExampleCard', () => {
  it('renders a heading with formatted title text', () => {
    render(<ExampleCard />);

    expect(screen.getByRole('heading', { level: 2, name: 'Example card' })).toBeInTheDocument();
  });

  it('renders optional subtitle when provided', () => {
    render(<ExampleCard subtitle="Plan your next trip" />);

    expect(screen.getByText('Plan your next trip')).toBeInTheDocument();
  });
});
