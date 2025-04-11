// styles/components/DiceRoller.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions for responsive calculations
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calculate responsive values
const responsiveDiceSize = Math.min(150, screenWidth * 0.35);
const buttonPadding = Math.min(12, screenHeight * 0.018);
const fontSize = Math.min(18, screenWidth * 0.045);

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    height: Math.min(400, screenHeight * 0.45), // Responsive height
    paddingTop: 15,
    paddingBottom: 15,
  },
  compactContainer: {
    height: 200,
    padding: 10,
    marginBottom: 0,
  },
  diceContainer: {
    width: responsiveDiceSize,
    height: responsiveDiceSize,
    backgroundColor: COLORS.white,
    borderRadius: Math.min(24, responsiveDiceSize * 0.15),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: Math.min(20, screenHeight * 0.03),
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
    marginTop: 20, // Add explicit margin top
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
    marginTop: 5,
    position: 'relative',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  compactResultText: {
    fontSize: 18,
    marginBottom: 5,
  },
  transportText: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 5,
  },
  rollButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignSelf: 'center', // Ensures horizontal centering
    marginTop: 10, // Adds a bit of space
    // Same position as continue button
    position: 'relative',
    bottom: 0,
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
    marginTop: 10, // Added margin to create consistent space
    alignSelf: 'center', // Ensures horizontal centering
    // Same position as roll button
    position: 'relative',
    bottom: 0,
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