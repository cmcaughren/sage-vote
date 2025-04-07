// styles/screens/Home.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40, // Spacing between logo and tagline
  },
  logo: {
    width: width * 0.8, // 80% of screen width
    height: undefined,
    aspectRatio: 1,
  },
  taglineContainer: {
    marginBottom: 50, // Space between tagline and buttons
    alignItems: 'center',
  },
  taglinePrimary: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.info,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 8,
  },
  taglineSecondary: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.info,
    textAlign: 'center',
    maxWidth: 300,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
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
    position: 'absolute',
    bottom: 20,
  }
});

export default styles;