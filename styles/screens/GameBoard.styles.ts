// styles/screens/GameBoard.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row', // Change to row to allow horizontal layout
    justifyContent: 'space-between', // Push items to opposite ends
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary, // Sage green
    alignItems: 'center',
    width: '100%', // Ensure full width
  },
  headerContent: {
    flex: 1, // Take available space
    alignItems: 'center', // Center content
  },
  title: {
    fontSize: 22, // Increased from 20
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18, // Increased from 16
    color: COLORS.white,
    marginTop: 5,
    textAlign: 'center',
  },
  cardInfo: {
    fontSize: 14,
    color: COLORS.secondary + 'D9', // Golden yellow with transparency
    marginTop: 3,
  },
  boardContainer: {
    flex: 1,
    margin: 10,
    marginTop: 50,
    marginBottom: 60,
    borderRadius: 10,
    overflow: 'visible',
    backgroundColor: COLORS.background,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    overflow: 'visible',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  backButton: {
    backgroundColor: COLORS.error,
  },
  cardButton: {
    backgroundColor: COLORS.secondary,
  },
  forwardButton: {
    backgroundColor: COLORS.primary,
  },
  homeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  primaryActionButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryActionButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;