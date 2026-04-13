import { render, screen } from '@testing-library/react';
import { Search } from 'lucide-react';
import { createRef } from 'react';
import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('renders a textbox', () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('associates label with the control', () => {
    render(<Input id="trip-dest" label="Destination" />);
    const input = screen.getByRole('textbox', { name: 'Destination' });
    expect(input).toHaveAttribute('id', 'trip-dest');
  });

  it('links hint via aria-describedby', () => {
    render(<Input label="Budget" hint="Rough range is fine." />);
    const input = screen.getByRole('textbox', { name: 'Budget' });
    const hintId = input.getAttribute('aria-describedby');
    expect(hintId).toBeTruthy();
    const hint = document.getElementById(hintId!);
    expect(hint).toHaveTextContent('Rough range is fine.');
  });

  it('links error via aria-describedby and sets aria-invalid', () => {
    render(<Input label="Dates" error="Please choose valid dates." />);
    const input = screen.getByRole('textbox', { name: 'Dates' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const ids = input.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    const errorEl = document.getElementById(ids.find((id) => id.endsWith('-error'))!);
    expect(errorEl).toHaveTextContent('Please choose valid dates.');
  });

  it('merges external aria-describedby with hint and error ids', () => {
    render(<Input label="X" hint="h" error="e" aria-describedby="extra" />);
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toMatch(/extra/);
    expect(input.getAttribute('aria-describedby')).toMatch(/-hint/);
    expect(input.getAttribute('aria-describedby')).toMatch(/-error/);
  });

  it('sets aria-invalid from aria-invalid prop without error message', () => {
    render(<Input aria-invalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref to the native input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} defaultValue="Rome" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.value).toBe('Rome');
  });

  it('merges className with variant styles', () => {
    render(<Input className="extra-class" />);
    const el = screen.getByRole('textbox');
    expect(el).toHaveClass('extra-class');
    expect(el).toHaveClass('border-tc-slate-200');
  });

  it('disables the control', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders prefix and suffix', () => {
    render(
      <Input
        prefix={<span data-testid="prefix">$</span>}
        suffix={<Search data-testid="suffix" aria-hidden />}
        aria-label="Search trips"
      />,
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search trips' })).toBeInTheDocument();
  });

  it('applies search variant classes', () => {
    render(<Input variant="search" data-testid="inp" />);
    expect(screen.getByTestId('inp')).toHaveClass('md:text-xl');
  });

  it('applies size from padding and typography', () => {
    const { rerender } = render(<Input size="sm" data-testid="inp" />);
    const sm = screen.getByTestId('inp');
    expect(sm).toHaveClass('py-1.5', 'text-sm');
    expect(sm).not.toHaveClass('h-8');
    expect(sm).not.toHaveClass('h-10');
    expect(sm).not.toHaveClass('h-12');

    rerender(<Input size="lg" data-testid="inp" />);
    const lg = screen.getByTestId('inp');
    expect(lg).toHaveClass('py-2.5', 'text-lg');
  });
});
