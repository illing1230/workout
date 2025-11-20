// Burnfit-inspired Dark Theme Color Palette
export const colors = {
  // Primary colors (Burnfit blue)
  primary: '#3292FF', // Bright blue
  primaryDark: '#0066CC',
  primaryLight: '#66B3FF',

  // Secondary colors
  secondary: '#FF6B6B', // Coral red
  secondaryDark: '#EE5A52',
  secondaryLight: '#FF8787',

  // Accent colors
  accent: '#00D9FF', // Cyan accent
  success: '#00E676', // Bright green
  warning: '#FFD600', // Yellow
  danger: '#FF3D00', // Red

  // Dark theme backgrounds
  background: '#0F1419', // Very dark blue-gray (darkest)
  backgroundAlt: '#1A1F26', // Dark gray
  surface: '#242D34', // Dark surface (main card background)
  surfaceLight: '#2D3741', // Lighter surface
  surfaceAlt: '#1E252C', // Alternative surface

  // Text colors for dark theme
  textPrimary: '#FFFFFF', // White
  textSecondary: '#B0B8C1', // Light gray
  textTertiary: '#6B7280', // Medium gray
  textMuted: '#4B5563', // Muted gray

  // Border colors for dark theme
  border: '#2D3741',
  borderLight: '#374151',
  borderDark: '#1F2937',
};

// Gradient combinations for dark theme
export const gradients = {
  primary: ['#3292FF', '#00D9FF'], // Blue to cyan
  secondary: ['#FF6B6B', '#FF8787'], // Coral gradient
  success: ['#00E676', '#00C853'], // Green gradient
  sunset: ['#FF6B6B', '#FFD600'], // Red to yellow
  ocean: ['#00D9FF', '#3292FF'], // Cyan to blue
  purple: ['#9C27B0', '#E040FB'], // Purple gradient
  fire: ['#FF3D00', '#FF6B6B'], // Hot red gradient
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Typography
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};

export default {
  colors,
  gradients,
  spacing,
  borderRadius,
  shadows,
  typography,
};
