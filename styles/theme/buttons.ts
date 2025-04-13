// styles/theme/buttons.ts
import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const BUTTONS = StyleSheet.create({
   primary: {
      backgroundColor: COLORS.primary,
      paddingVertical: 12, // Smaller padding like home screen
      borderRadius: 10, // More rounded corners
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      maxWidth: 320, // Match the width from home screen
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      alignSelf: 'center', // Center the button
   },
   secondary: {
      backgroundColor: COLORS.secondary,
      // Same properties as primary
      paddingVertical: 12, // Smaller padding like home screen
      borderRadius: 10, // More rounded corners
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      maxWidth: 320, // Match the width from home screen
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      alignSelf: 'center', // Center the button
   },
   buttonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: '600',
   }
});

export default BUTTONS;