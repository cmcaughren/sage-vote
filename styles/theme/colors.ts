// styles/theme/colors.ts

/**
 * Main color palette for the application
 */
export const COLORS = {
   // Brand Colors
   primary: '#52b9a9',   // Teal - primary brand color
   secondary: '#ff9248', // Orange - secondary brand color
   tertiary: '#87CEEB',  // Sky Blue - accent color
   tertiaryLight: '#c3e6ff', // Light Sky Blue
   
   // Path Colors
   busPath: {
     base: '#87CEEB',
     shades: ['#87CEEB', '#7EC0E4', '#74B4DE', '#6AA7D7', '#5F9AD1'],
   },
   carpoolPath: {
     base: '#c3e6df',
     shades: ['#c3e6df', '#a6dbd1', '#8ad0c4', '#6ec4b6', '#52b9a9'],
   },
   bicyclePath: {
     base: '#ff9248',
     shades: ['#ff9248', '#ff9e5c', '#ffaa70', '#ffb684', '#ffc298'],
   },

   // Celebration/Confetti colors
  confetti: [
    // Include brand colors
    '#52b9a9', // primary
    '#ff9248', // secondary
    '#87CEEB', // tertiary
    // Additional festive colors
    '#FFD700', // Gold
    '#FF69B4', // Hot Pink
    '#9370DB', // Medium Purple
    '#00CED1', // Dark Turquoise
    '#FF6347', // Tomato
    '#32CD32'  // Lime Green
  ],   
   // Neutrals
   white: '#ffffff',
   black: '#000000',
   dark: '#333333',
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
   
   // Background
   background: '#f5f7fa',
   
   // Semantic colors
   success: '#4caf50',
   error: '#f44336',
   warning: '#ff9800',
   info: '#2196f3',
   
   // Transparent variants (for overlays, etc.)
   transparent: {
     light: 'rgba(255, 255, 255, 0.8)',
     dark: 'rgba(0, 0, 0, 0.5)',
     primary: 'rgba(82, 185, 169, 0.2)',
     secondary: 'rgba(255, 146, 72, 0.2)',
     tertiary: 'rgba(135, 206, 235, 0.2)',
   },
   
   // Helper method to add opacity to any color
   withOpacity: (color: string, opacity: number) => {
     // Convert hex to rgba if it's a hex color
     if (color.startsWith('#')) {
       const r = parseInt(color.slice(1, 3), 16);
       const g = parseInt(color.slice(3, 5), 16);
       const b = parseInt(color.slice(5, 7), 16);
       return `rgba(${r}, ${g}, ${b}, ${opacity})`;
     }
     return color;
   }
 };
 
 // Export default for easier imports
 export default COLORS;