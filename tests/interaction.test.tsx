import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Small fixture to exercise user-event + RTL without coupling to app data fetching.
 * Prefer testing real components once they expose meaningful interactions.
 */
function Disclosure({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide' : label}
      </button>
      {open ? <p>Details</p> : null}
    </div>
  );
}

describe('user-driven behavior (RTL + user-event)', () => {
  it('reveals content when the user activates the control', async () => {
    const user = userEvent.setup();
    render(<Disclosure label="Show details" />);

    expect(screen.queryByText('Details')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show details' }));

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hide' })).toBeInTheDocument();
  });
});
