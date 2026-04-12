/**
 * Programmatic design tokens — keep in lockstep with `src/app/globals.css`.
 *
 * - `typography` — same class strings as `tc-type-*` @utility rules (§5.3).
 * - `colors.light` / `colors.dark` — same hex as `:root` and `prefers-color-scheme: dark` (§5.2).
 * - `tc` — same hex as `--color-tc-*` in `@theme inline` (§5.2 tc.* scale; light only today).
 *
 * In UI components prefer CSS variables / Tailwind theme colors; use `colors` / `tc` for canvas, charts,
 * or exports. Spacing: Tailwind default scale (§5.4).
 */
export const typography = {
  display: 'text-4xl font-semibold tracking-tight md:text-5xl',
  h1: 'text-3xl font-semibold tracking-tight md:text-4xl',
  h2: 'text-2xl font-semibold tracking-tight md:text-3xl',
  h3: 'text-xl font-semibold',
  body: 'text-base leading-7',
  'body-large': 'text-lg leading-8',
  'body-small': 'text-sm leading-6',
  label: 'text-sm font-medium',
  caption: 'text-xs font-medium uppercase tracking-wide',
} as const;

export const colors = {
  light: {
    brand: {
      primary: '#1d73e8',
      primaryHover: '#155fcc',
      primarySoft: '#eaf3ff',
      secondary: '#213a63',
      accent: '#7ec8f8',
    },
    neutral: {
      canvas: '#f4f7fb',
      surface: '#ffffff',
      subtle: '#f8fafc',
      border: '#d9e2ec',
      borderStrong: '#bcccdc',
      textPrimary: '#10233e',
      textSecondary: '#37506e',
      textMuted: '#6b7c93',
      textInverse: '#ffffff',
    },
    feedback: {
      success: '#1f9d63',
      warning: '#c58917',
      error: '#d14343',
      info: '#2d7ff9',
    },
    confidence: {
      high: '#1f9d63',
      medium: '#d89b1c',
      low: '#d14343',
      fallbackBg: '#fff8e8',
      fallbackBorder: '#f1d18a',
    },
  },
  dark: {
    brand: {
      primary: '#4b93f7',
      primaryHover: '#6aa6ff',
      primarySoft: '#15202f',
      secondary: '#a3bce0',
      accent: '#8ccbf8',
    },
    neutral: {
      canvas: '#0c1018',
      surface: '#131b28',
      subtle: '#18202f',
      border: '#2a3546',
      borderStrong: '#3d4f68',
      textPrimary: '#eef2f7',
      textSecondary: '#a7b4c8',
      textMuted: '#6f7f95',
      textInverse: '#0c1018',
    },
    feedback: {
      success: '#3ecf8e',
      warning: '#e4a82a',
      error: '#e86060',
      info: '#5c9aff',
    },
    confidence: {
      high: '#3ecf8e',
      medium: '#e8b23d',
      low: '#e86060',
      fallbackBg: '#241e14',
      fallbackBorder: '#6b5530',
    },
  },
} as const;

/** §5.2 — `tc.*` theme scale (light); must match `--color-tc-*` in globals.css `@theme inline`. */
export const tc = {
  blue: {
    50: '#eaf3ff',
    100: '#d8e9ff',
    500: '#1d73e8',
    600: '#155fcc',
    700: '#124eab',
  },
  slate: {
    50: '#f8fafc',
    100: '#f4f7fb',
    200: '#d9e2ec',
    300: '#bcccdc',
    500: '#6b7c93',
    700: '#37506e',
    900: '#10233e',
  },
  success: '#1f9d63',
  warning: '#c58917',
  danger: '#d14343',
  info: '#2d7ff9',
} as const;
