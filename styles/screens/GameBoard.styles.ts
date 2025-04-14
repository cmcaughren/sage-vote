// styles/screens/GameBoard.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';
import { BUTTONS } from '../theme/buttons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const vw = screenWidth / 100;
const vh = screenHeight / 100;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    height: '20%',
    width: '100%',
    paddingHorizontal: 4 * vw,
    //paddingVertical: 2 * vh,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
  notebookIconContainer: {
    position: 'absolute',
    top: 2 * vh,
    right: 4 * vw,
    zIndex: 10,
  },
  // Board container takes 60% of screen
  boardContainer: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  buttonContainer: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawCardButton: {
    backgroundColor: COLORS.secondary,
    width: '90%',
    maxWidth: 320,
    //paddingVertical: Math.min(15, 2 * vh),
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