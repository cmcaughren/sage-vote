// styles/theme/typography.ts
import { TextStyle } from 'react-native';
import { COLORS } from './colors';

/**
 * Font family configuration
 * Replace with your app's actual fonts if you're using custom fonts
 */
export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

/**
 * Font sizes used throughout the app
 */
export const FONT_SIZES = {
  xs: 10,
  small: 12,
  medium: 14,
  regular: 16,
  large: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

/**
 * Line heights used throughout the app
 */
export const LINE_HEIGHTS = {
  xs: 14,
  small: 18,
  medium: 20,
  regular: 22,
  large: 24,
  xl: 28,
  xxl: 32,
  xxxl: 38,
};

/**
 * Font weights
 */
export const FONT_WEIGHTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

/**
 * Typography styles for the app
 */
export const TYPOGRAPHY: Record<string, TextStyle> = {
  // Headers
  h1: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.xxxl,
    color: COLORS.dark,
  },
  h2: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.xxl,
    color: COLORS.dark,
  },
  h3: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.xl,
    color: COLORS.dark,
  },
  h4: {
    fontSize: FONT_SIZES.large,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.large,
    color: COLORS.dark,
  },
  
  // Body text
  body1: {
    fontSize: FONT_SIZES.regular,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.regular,
    color: COLORS.dark,
  },
  body2: {
    fontSize: FONT_SIZES.medium,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.medium,
    color: COLORS.dark,
  },
  
  // Other text styles
  caption: {
    fontSize: FONT_SIZES.small,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.small,
    color: COLORS.gray[600],
  },
  button: {
    fontSize: FONT_SIZES.regular,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: LINE_HEIGHTS.regular,
    color: COLORS.white,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.medium,
    color: COLORS.dark,
  },
  
  // Special text styles
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.xl,
    color: COLORS.dark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.regular,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.regular,
    color: COLORS.dark + 'CC', // With opacity
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.large,
    color: COLORS.dark,
  },
  buttonText: {
    fontSize: FONT_SIZES.regular,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.white,
  },
  
  // With specific colors
  primaryText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  secondaryText: {
    color: COLORS.secondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  
  // Helper methods
  withColor: (baseStyle: TextStyle, color: string): TextStyle => ({
    ...baseStyle,
    color,
  }),
  withAlign: (baseStyle: TextStyle, textAlign: TextStyle['textAlign']): TextStyle => ({
    ...baseStyle,
    textAlign,
  }),
};

// Export default for easier imports
export default TYPOGRAPHY;