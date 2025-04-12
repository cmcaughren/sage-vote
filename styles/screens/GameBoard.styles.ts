// styles/screens/GameBoard.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions for responsive calculations
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const vw = screenWidth / 100;
const vh = screenHeight / 100;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    height: '15%', // Proportional header height
    width: '100%',
    paddingHorizontal: 4 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // For notebook icon positioning
  },
  title: {
    fontSize: Math.min(22, 5.5 * vw), // Responsive text size
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(16, 4 * vw), // Responsive text size
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginTop: 0.5 * vh,
  },
  notebookIconContainer: {
    position: 'absolute',
    top: 2 * vh,
    right: 4 * vw,
    zIndex: 10,
  },
  boardContainer: {
    height: '75%', // Takes 75% of screen height
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal: 2 * vw,
  },
  buttonContainer: {
    height: '10%', // Fixed proportion for bottom button
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5 * vw,
    paddingBottom: 2 * vh,
  },
  drawCardButton: {
    backgroundColor: COLORS.secondary,
    width: '90%',
    maxWidth: 400,
    paddingVertical: Math.min(15, 2 * vh),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: Math.min(18, 4.5 * vw),
    fontWeight: '600',
  },
});