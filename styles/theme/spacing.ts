// styles/theme/spacing.ts

/**
 * Standardized spacing values for consistent layout throughout the app
 */
export const SPACING = {
   // Base spacing units
   xxs: 2,
   xs: 4,
   s: 8,
   m: 16,
   l: 24,
   xl: 32,
   xxl: 48,
   xxxl: 64,
   
   // Semantic spacing
   container: 20, // Standard padding for screen containers
   cardPadding: 16, // Padding inside cards
   sectionMargin: 24, // Margin between major sections
   itemMargin: 12, // Margin between items in a list
   inputPadding: 12, // Padding for input fields
   buttonPadding: {
     vertical: 12,
     horizontal: 24,
   },
   headerPadding: 15, // Padding for headers
   
   // Layout values
   borderRadius: {
     small: 4,
     medium: 8,
     large: 12,
     round: 9999, // For circular elements
   },
   borderWidth: {
     thin: 1,
     medium: 2,
     thick: 3,
   },
   
   // Helper functions
   insets: (vertical: number, horizontal: number) => ({
     paddingVertical: vertical,
     paddingHorizontal: horizontal,
   }),
   margin: (vertical: number, horizontal: number) => ({
     marginVertical: vertical,
     marginHorizontal: horizontal,
   }),
   padding: (vertical: number, horizontal: number) => ({
     paddingVertical: vertical,
     paddingHorizontal: horizontal,
   }),
 };
 
 // Export default for easier imports
 export default SPACING;