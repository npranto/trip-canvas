/**
 * Programmatic design tokens. Colors mirror spec §5.2 (`app/globals.css`); prefer CSS variables in
 * components. Use `tripCanvasColors` for charts, canvas, or non-Tailwind contexts.
 *
 * Typography: Tailwind class bundles per spec §5.3 — pair with `font-sans` (Inter) from the root layout.
 */
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
