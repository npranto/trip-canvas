import { formatTitle } from '@/lib/formatTitle';

describe('formatTitle', () => {
  it('returns empty string for whitespace-only input', () => {
    expect(formatTitle('   ')).toBe('');
  });

  it('trims and title-cases a single word', () => {
    expect(formatTitle('  HELLO  ')).toBe('Hello');
  });

  it('lower-cases the remainder after the first character', () => {
    expect(formatTitle('hELLo')).toBe('Hellox');
  });
});
