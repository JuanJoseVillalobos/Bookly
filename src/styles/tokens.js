/**
 * Bookly Design Tokens
 * Source of truth for brand colors, typography, spacing, shadows, and breakpoints.
 * Aesthetic: Premium Editorial Minimalism.
 */

export const colors = {
  // Brand Core
  ivory: '#F7F5EF',          // Main background
  forest: {
    DEFAULT: '#173F35',      // Primary brand
    light: '#24584B',
    dark: '#0F2A23',
    subtle: '#E8EFEA',       // Light tint for tags/accents
  },
  charcoal: {
    DEFAULT: '#222824',      // Main text
    muted: '#5F6862',        // Secondary body text
    light: '#8E9791',        // Hints, placeholders
  },
  sandGold: {
    DEFAULT: '#C5A77A',      // Accent color
    light: '#DCC39E',
    dark: '#A38456',
    subtle: '#FAF6EF',
  },
  stone: {
    DEFAULT: '#E8E5DC',      // Borders and dividers
    light: '#F3F1EC',        // Subtle background cards
    dark: '#D1CDC2',         // Stronger borders
  },

  // Semantic Feedback
  status: {
    pendingBg: '#FEF3C7',    // Amber 100 for "Pending approval"
    pendingText: '#92400E',  // Amber 800
    confirmedBg: '#DEF7EC',
    confirmedText: '#03543F',
    errorBg: '#FDF2F2',
    errorText: '#9B1C1C',
  },
};

export const typography = {
  fontFamily: {
    serif: ['"Playfair Display"', 'Georgia', 'serif'],
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1.16' }],
    '6xl': ['3.75rem', { lineHeight: '1.1' }],
  },
};

export const breakpoints = {
  sm: '640px',   // Mobile landscape / large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops / Small desktops
  xl: '1280px',  // Desktop
  '2xl': '1536px',
};

export const designTokens = {
  colors,
  typography,
  breakpoints,
};

export default designTokens;

