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
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // This will maintain the aspect ratio while spanning the full width
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 300,
    lineHeight: 22,
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
  emojiText: {
    fontSize: 20,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  devModeContainer: {
    backgroundColor: '#ff000030',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  devModeText: {
    color: '#E53935',
    fontSize: 12,
    fontWeight: 'bold',
  },
  versionText: {
    position: 'absolute',
    bottom: 20,
    color: COLORS.dark + '80',
    fontSize: 12,
  }
});

export default styles;