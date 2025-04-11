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
  // Top section
  headerSection: {
    height: '30%',
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

  // Bottom  (20%)
  optionsContainer: {
    height: '20%', // Takes up bottom quarter
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 4 * vw,
    paddingBottom: 2 * vh,
    alignItems: 'center',
  },
  optionCard: {
    aspectRatio: 1, // Keeps square shape
    width: '28%', // Slightly less than 1/3 for spacing
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
    width: '40%',
    aspectRatio: 1, // Keeps it circular
    borderRadius: 999, // Ensure circle shape
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0.5 * vh,
  },
  optionEmoji: {
    fontSize: Math.min(18, 4.5 * vw),
  },
  optionTitle: {
    fontSize: Math.min(13, 3.2 * vw),
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 0.2 * vh,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: Math.min(11, 2.8 * vw),
    color: COLORS.dark + 'CC',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 0.2 * vh,
  },
  optionSubtext: {
    fontSize: Math.min(10, 2.5 * vw),
    color: COLORS.dark + '80',
    textAlign: 'center',
  },
});