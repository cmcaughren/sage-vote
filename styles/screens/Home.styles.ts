// styles/screens/Home.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calculate responsive units
const vw = screenWidth / 100;
const vh = screenHeight / 100;

// Check if it's a small device
//const isSmallDevice = screenHeight < 700;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0, // Remove general padding
    paddingTop: 1 * vh, // Minimal top padding
  },
  logoSection: {
    height: '60%', // Increased significantly to 60%
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4 * vw, // Horizontal padding only
  },
  logo: {
    width: '100%',
    aspectRatio: 1, // Maintain logo's aspect ratio instead of fixed height
    maxWidth: 550, // Larger maximum size
  },
  taglineSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 5 * vw,
    // No margins - use the layout's natural spacing
  },
  taglinePrimary: {
    fontSize: Math.min(24, 6 * vw),
    fontWeight: '600',
    color: COLORS.info,
    textAlign: 'center',
    marginBottom: 0.5 * vh, // Reduced margin
  },
  taglineSecondary: {
    fontSize: Math.min(16, 4 * vw),
    color: COLORS.info,
    textAlign: 'center',
    maxWidth: 320,
  },
  buttonContainer: {
    width: '90%', // Slightly wider
    maxWidth: 320,
    marginTop: 2 * vh, // Reduced margin
    paddingHorizontal: 5 * vw,
  },
  button: {
    paddingVertical: 12, // Slightly reduced height
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 1.5 * vh, // Reduced margin
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  notebookButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: Math.min(18, 4.5 * vw),
    fontWeight: '600',
  },
  notebookButtonText: {
    color: COLORS.white,
    fontSize: Math.min(18, 4.5 * vw),
    fontWeight: '600',
  },
  versionText: {
    color: COLORS.dark + '80',
    fontSize: 12,
    marginBottom: 2 * vh,
    marginTop: 1 * vh,
  }
});