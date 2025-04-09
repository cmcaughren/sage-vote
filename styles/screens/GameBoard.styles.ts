// styles/screens/GameBoard.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header section - updated to match Crossroads style
  headerSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25, // Increased padding to move content down
    marginBottom: 20, // More space before the game board
    position: 'relative', // For positioning the notebook icon
  },
  title: {
    fontSize: 30, // Slightly larger
    fontWeight: 'bold',
    color: COLORS.dark, // Changed to dark color instead of periwinkle
    textAlign: 'center',
    marginBottom: 10, // More space after title
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 12,
  },

  // Transport mode display
  //transportContainer: {
  //  backgroundColor: COLORS.background,
  //  paddingVertical: 8,
  //  paddingHorizontal: 16,
  //  borderRadius: 12,
  //  borderWidth: 1,
  //  borderColor: COLORS.primary + '30',
  //},
  transportText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.dark,
    textAlign: 'center',
  },

  // Notebook positioning
  notebookIconContainer: {
    position: 'absolute',
    top: 15, // Align with top of header
    right: 20,
    zIndex: 10,
  },

  // Card info for dev mode
  cardInfo: {
    fontSize: 14,
    color: COLORS.secondary + 'D9',
    marginTop: 3,
  },

  // Game board container
  boardContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 60,
    borderRadius: 10,
    overflow: 'visible',
    backgroundColor: COLORS.background,
  },

  // Controls for dev mode
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    overflow: 'visible',
  },

  // Button styles
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

  // Main action button
  primaryActionButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 200,
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