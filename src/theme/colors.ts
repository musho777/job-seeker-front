export const colors = {
  // Primary whites and backgrounds
  white: '#FFFFFF',
  background: '#F8FAFC',
  surface: '#FFFFFF',

  // Modern grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Modern blue palette
  blue50: '#EFF6FF',
  blue100: '#DBEAFE',
  blue200: '#BFDBFE',
  blue300: '#93C5FD',
  blue400: '#60A5FA',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  blue700: '#1D4ED8',

  // Success green
  green50: '#F0FDF4',
  green100: '#DCFCE7',
  green200: '#BBF7D0',
  green500: '#22C55E',
  green600: '#16A34A',

  // Accent colors
  purple50: '#FAF5FF',
  purple500: '#A855F7',
  purple600: '#9333EA',

  // Semantic colors
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  success: '#22C55E',
  successDark: '#16A34A',
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  // Shadows
  shadowColor: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  button: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
};
