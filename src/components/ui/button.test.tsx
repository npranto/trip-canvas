import { render, screen } from '@testing-library/react';
import { Star } from 'lucide-react';
import { createRef } from 'react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects type override', () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('merges className with variant styles', () => {
    render(<Button className="extra-class">X</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveClass('extra-class');
    expect(el).toHaveClass('bg-brand-primary');
  });

  it('forwards ref to the native button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe('Ref');
  });

  it('disables the control when disabled', () => {
    render(<Button disabled>Off</Button>);
    const el = screen.getByRole('button');
    expect(el).toBeDisabled();
    expect(el).not.toHaveAttribute('aria-busy');
  });

  it('disables and sets aria-busy while loading', () => {
    render(<Button isLoading>Saving</Button>);
    const el = screen.getByRole('button');
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Saving')).toBeInTheDocument();
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('replaces leftIcon with spinner when loading and hides rightIcon', () => {
    render(
      <Button
        isLoading
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Text
      </Button>,
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders left and right icons when not loading', () => {
    render(
      <Button
        leftIcon={<Star data-testid="icon-l" aria-hidden />}
        rightIcon={<Star data-testid="icon-r" aria-hidden />}
      >
        Mid
      </Button>,
    );
    expect(screen.getByTestId('icon-l')).toBeInTheDocument();
    expect(screen.getByTestId('icon-r')).toBeInTheDocument();
  });

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Out</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-edge');
    expect(screen.getByRole('button')).toHaveClass('bg-surface');
  });

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-brand-primary');
  });

  it('applies danger variant classes', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-error');
  });

  it('applies link variant classes', () => {
    render(<Button variant="link">Link</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveClass('underline-offset-4');
    expect(el).toHaveClass('hover:underline');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">S</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');

    rerender(<Button size="lg">L</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12');

    rerender(
      <Button size="icon" aria-label="Star">
        <Star aria-hidden />
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass('size-10');
  });
});
