// styles/components/ui/DiceRoller.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 400,
  },
  compactContainer: {
    height: 200, // Reduced from 300
    padding: 10,
    marginBottom: 0, // No extra margin at the bottom
  },
  diceContainer: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 40,
  },
  compactDiceContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 20, // Reduced margin
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactBottomSection: {
    marginTop: 0,
    marginBottom: 0,
  },
  diceFace: {
    width: '100%',
    height: '100%',
    padding: 8,
  },
  diceGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dotContainer: {
    width: '33.33%',
    height: '33.33%',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: '90%',
    height: '90%',
    borderRadius: 50,
    backgroundColor: COLORS.black,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  compactResultText: {
    fontSize: 18,
    marginBottom: 5,
  },
  transportText: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 10,
  },
  rollButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  rollButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 5,
  },
  compactButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
  },
  // Additional dot position styles
  topLeft: {},
  topRight: {},
  middleLeft: {},
  middle: {},
  middleRight: {},
  bottomLeft: {},
  bottomRight: {},
});

export default styles;