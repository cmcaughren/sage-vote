// styles/screens/Crossroads.styles.ts
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calculate responsive units
const vw = screenWidth / 100; // 1% of viewport width
const vh = screenHeight / 100; // 1% of viewport height

// Spacing constants
const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5 * vw, // 5% of screen width
    paddingTop: 5 * vh,
    paddingBottom: 5 * vh, // 5% of screen height
    overflow: 'visible', // Add this to allow child elements to overflow
  },
  headerSection: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 90 * vw, // 90% of viewport width
    marginBottom: 4 * vh, // Increased from whatever you had before
    paddingBottom: 1 * vh, // Add padding to create more space
  },
  title: {
    fontSize: Math.min(24, 6 * vw), // Responsive font size
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: Math.min(16, 4 * vw), // Responsive font size
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    maxWidth: 90 * vw,
    marginBottom: SPACING.lg,
  },
  infoContainer: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: 10,
    padding: SPACING.md,
    width: '100%',
    maxWidth: 90 * vw,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  infoText: {
    fontSize: Math.min(14, 3.5 * vw),
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: Math.min(20, 5 * vw),
  },
  diceContainer: {
    width: '100%',
    height: 45 * vh, // 45% of viewport height
    marginTop: 0 * vh,
    marginBottom: 0 * vh,
    position: 'relative', // Add this
    zIndex: 10, // Ensure dice stays on top
    overflow: 'visible', // CRITICAL: Allow animation to extend outside container
  },
  // Responsive option container
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 600, // Maximum width on larger devices
    flexWrap: 'wrap', // Allow wrapping on very small screens
    marginTop: 0, // Reduced to save space
    paddingHorizontal: SPACING.xs,
  },
  optionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: SPACING.xs, // Smaller margins
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden', // Changed from 'visible'
    padding: SPACING.xs,
    minHeight: 80, // Ensure minimum height
  },
  // Responsive option container
  //optionsContainer: {
  //  flexDirection: 'row',
  //  justifyContent: 'space-between',
  //  width: '100%',
  //  maxWidth: 100 * vw,
  //  paddingHorizontal: SPACING.xs,
  //  marginTop: -2 * vh,
  //  minHeight: 15 * vh, // Minimum height of 15% of screen height
  //  marginHorizontal: '2%', // Center the container
  //  paddingBottom: 1 * vh, // Add some padding at bottom
  //},
  //optionCard: {
  //  flex: 1, // Take equal space
  //  aspectRatio: 1, // Slightly taller than wide
  //  backgroundColor: COLORS.white,
  //  borderRadius: 10,
  //  margin: SPACING.sm, // Space between cards
  //  shadowColor: COLORS.black,
  //  shadowOffset: { width: 0, height: 1 },
  //  shadowOpacity: 0.1,
  //  shadowRadius: 2,
  //  elevation: 2,
  //  overflow: 'visible', // Ensure content doesn't overflow
  //  padding: SPACING.xs, // Consistent padding
  //  //maxWidth: 28 * vw,
  //},
  // Content container inside card
  optionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // Space items evenly
    paddingVertical: SPACING.xs, // Top/bottom padding
  },
  optionIcon: {
    width: Math.min(40, 10 * vw),
    height: Math.min(40, 10 * vw),
    borderRadius: Math.min(20, 5 * vw),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  optionEmoji: {
    fontSize: Math.min(22, 5.5 * vw),
  },
  optionTitle: {
    fontSize: Math.min(12, 3.3 * vw),
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: Math.min(11, 3 * vw),
    color: COLORS.dark + 'CC',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  optionSubtext: {
    fontSize: Math.min(10, 2.8 * vw),
    color: COLORS.dark + '80',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },

});

export default styles;