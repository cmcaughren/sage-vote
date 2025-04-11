// styles/screens/Crossroads.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calculate responsive units
const vw = screenWidth / 100; // 1% of viewport width
const vh = screenHeight / 100; // 1% of viewport height

// Determine if it's a small device
const isSmallDevice = screenHeight < 700;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4 * vw,
    paddingTop: 2 * vh,
    paddingBottom: 2 * vh,
    overflow: 'visible',
  },
  headerSection: {
    width: '100%',
    alignItems: 'center',
    // Use percentage of available height instead of fixed margin
    maxHeight: isSmallDevice ? 25 * vh : 30 * vh,
  },
  title: {
    fontSize: Math.min(28, 6 * vw), // Responsive font size
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 1 * vh,
  },
  subtitle: {
    fontSize: Math.min(16, 4 * vw), // Responsive font size
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    maxWidth: 90 * vw,
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
  diceContainer: {
    width: '100%',
    // Adjust height based on screen size to maintain proportions
    height: isSmallDevice ? 30 * vh : 35 * vh,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxHeight: isSmallDevice ? 15 * vh : 20 * vh,
  },
  optionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 1 * vw,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 1 * vw,
  },
  optionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    width: Math.min(30, 8 * vw),
    height: Math.min(30, 8 * vw),
    borderRadius: Math.min(15, 4 * vw),
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
    marginBottom: 0.3 * vh,
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