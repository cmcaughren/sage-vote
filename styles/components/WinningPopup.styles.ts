// styles/components/ui/WinningPopup.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  confettiContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20, // Higher than modal background
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Lower than confetti
  },
  popupContainer: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  submessage: {
    fontSize: 16,
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
  },
  homeButton: {
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
  },
  continueText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  confettiPiece: {
    position: 'absolute',
    borderRadius: 3,
  },
});

export default styles;