// styles/theme/colors.ts

/**
 * Main color palette for the application
 */
export const COLORS = {
  // Brand Colors
  primary: '#ABC19B',//'#87A771',   // Medium Sage Green - primary brand color
  secondary: '#8B88F8', // Periwinkle - secondary brand color
  tertiary: '#FA8072',  // Salmon - accent color
  tertiaryLight: '#FCBBB6', // Lighter Salmon
  
  // Additional Accent Colors
  accent1: '#D9D500',   // Yellow-Olive
  accent2: '#B6B4FB',   // Light Periwinkle
  
  // Path Colors - coordinated with the new palette
  busPath: {
    base: '#8B88F8', // Periwinkle 
    shades: ['#8B88F8', '#9D9AF9', '#AEA9FA', '#BFB9FB', '#D1C9FC'],
  },
  carpoolPath: {
    base: '#FA8072', // Salmon
    shades: ['#FA8072', '#FB927F', '#FCA38D', '#FDB59A', '#FEC6A8'],
  },
  bicyclePath: {
    base: '#D9D500', // Yellow-Olive
    shades: ['#D9D500', '#D5D435', '#D2D35B', '#CED280', '#CBD1A6'],
  },

  // Original confetti colors remain unchanged
  confetti: [
    '#52b9a9', // Original teal primary
    '#ff9248', // Original orange secondary
    '#87CEEB', // Original sky blue tertiary
    '#FFD700', // Gold
    '#FF69B4', // Hot Pink
    '#9370DB', // Medium Purple
    '#00CED1', // Dark Turquoise
    '#FF6347', // Tomato
    '#32CD32'  // Lime Green
  ],
  
  // Base colors
  white: '#ffffff',
  black: '#000000',
  dark: '#333333',
  lightGray: '#e2e8f0',
  
  gray: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#e2e8f0',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
  
  // Background - using the lightest sage from the palette
  background: '#F5F9F2',//'#D6F6C3',
  
  // Semantic colors - aligned with new palette
  success: '#87A771', // Medium sage
  error: '#E5451E',   // Deep coral
  warning: '#D9D500', // Yellow-olive
  info: '#5F5AF4',    // Deep periwinkle
  
  withOpacity: (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  }
};

export default COLORS;