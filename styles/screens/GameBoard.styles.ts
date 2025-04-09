// styles/screens/GameBoard.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 15,
    backgroundColor: COLORS.primary, // Updated to sage green
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 5,
  },
  cardInfo: {
    fontSize: 14,
    color: COLORS.secondary + 'D9', // Golden yellow with transparency
    marginTop: 3,
  },
  notebookIconContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 10,
    paddingTop: 10,
  },
  boardContainer: {
    flex: 1,
    margin: 10,
    marginTop: 50,  // Increased from any previous value to move board down
    marginBottom: 60, // Keep space for the button at bottom
    borderRadius: 10,
    overflow: 'visible',
    backgroundColor: COLORS.background,
    //elevation: 5,
    //shadowColor: COLORS.black,
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,
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
    backgroundColor: COLORS.secondary, // Using the secondary color like the Notebook button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10, // More rounded corners like homepage buttons
    minWidth: 200, // Ensure button has good width
    maxWidth: 300, // But not too wide
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