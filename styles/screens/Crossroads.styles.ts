// styles/screens/Crossroads.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calculate responsive units
const vw = screenWidth / 100;
const vh = screenHeight / 100;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  // Top Quarter (25%)
  headerSection: {
    height: '25%', // Takes up top quarter
    width: '100%',
    paddingHorizontal: 5 * vw,
    paddingVertical: 2 * vh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Math.min(24, 6 * vw),
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 1 * vh,
  },
  subtitle: {
    fontSize: Math.min(16, 4 * vw),
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginBottom: 1 * vh,
  },
  infoContainer: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: 10,
    padding: 2 * vw,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  infoText: {
    fontSize: Math.min(14, 3.5 * vw),
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: Math.min(20, 5 * vw),
  },

  // Middle Half (50%)
  diceSection: {
    height: '50%', // Takes up middle half
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible', // Important for dice animations
  },

  // Bottom Quarter (25%)
  optionsContainer: {
    height: '25%', // Takes up bottom quarter
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 4 * vw,
    paddingBottom: 2 * vh,
    alignItems: 'center',
  },
  optionCard: {
    aspectRatio: 1, // Forces square shape
    width: '28%', // Slightly narrower than 1/3 to allow spacing
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 1 * vw,
  },
  optionIcon: {
    width: '50%', // Takes 50% of the card width
    aspectRatio: 1, // Circle
    borderRadius: 999, // Circle
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0.5 * vh,
  },
  optionEmoji: {
    fontSize: Math.min(18, 4.5 * vw),
  },
  optionTitle: {
    fontSize: Math.min(12, 3 * vw),
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 0.2 * vh,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: Math.min(10, 2.6 * vw),
    color: COLORS.dark + 'CC',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 0.2 * vh,
  },
  optionSubtext: {
    fontSize: Math.min(9, 2.4 * vw),
    color: COLORS.dark + '80',
    textAlign: 'center',
  },
});