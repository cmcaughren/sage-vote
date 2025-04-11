// styles/screens/Home.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calculate responsive units
const vw = screenWidth / 100;
const vh = screenHeight / 100;

// Check if it's a small device
const isSmallDevice = screenHeight < 700;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5 * vw,
    paddingTop: 2 * vh, // Reduced top padding
    paddingBottom: 6 * vh,
  },
  logoSection: {
    height: '50%', // Increased from 40% to 50%
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2 * vh,
  },
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: 500,
    maxHeight: 400,
  },
  taglineSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 1 * vh,
    marginBottom: 2 * vh,
  },
  taglinePrimary: {
    fontSize: Math.min(24, 6 * vw),
    fontWeight: '600',
    color: COLORS.info,
    textAlign: 'center',
    marginBottom: 1 * vh,
  },
  taglineSecondary: {
    fontSize: Math.min(16, 4 * vw),
    color: COLORS.info,
    textAlign: 'center',
    maxWidth: 300,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginTop: isSmallDevice ? 2 * vh : 4 * vh,
  },
  button: {
    paddingVertical: isSmallDevice ? 12 : 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 2 * vh,
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
    position: 'absolute',
    bottom: 2 * vh, // Responsive positioning
    alignSelf: 'center',
  }
});