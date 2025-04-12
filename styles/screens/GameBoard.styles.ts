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
    height: '10%',
    width: '100%',
    paddingHorizontal: 4 * vw,
    paddingTop: 2 * vh,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  buttonContainer: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2 * vh,
  },
  drawCardButton: {
    ...BUTTONS.secondary,
  },
  buttonText: {
    ...BUTTONS.buttonText
  },
});