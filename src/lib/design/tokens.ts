/**
 * Programmatic mirror of semantic color tokens (see `app/globals.css` / spec §5.2).
 * Prefer CSS variables in components; use this for charts, canvas, or non-Tailwind contexts.
 */
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
