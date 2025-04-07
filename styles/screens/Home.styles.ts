// styles/screens/Home.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // This distributes space more evenly
    padding: 20,
    width: '100%',
    paddingTop: height * 0.12, // Top padding as percentage of screen height
    paddingBottom: height * 0.08, // Bottom padding as percentage of screen height
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
    flex: 1, // This allows the top section to take available space
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // Reduced from 20
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 0, // Removed extra margin
  },
  taglineContainer: {
    marginTop: height * 0.03, // Dynamic spacing based on screen height
    marginBottom: height * 0.05, // Dynamic spacing based on screen height
    alignItems: 'center',
  },
  taglinePrimary: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.info,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 8,
    letterSpacing: 0.5,
    lineHeight: 28,
  },
  taglineSecondary: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.info,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
  },
  middleSection: {
    flex: 0.5, // Takes less space than top section
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20, // Reduced from 40
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
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
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  notebookButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  versionText: {
    color: COLORS.dark + '80',
    fontSize: 12,
    marginTop: 10,
  }
});

export default styles;