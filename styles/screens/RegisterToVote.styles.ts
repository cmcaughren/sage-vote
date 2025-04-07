// styles/screens/RegisterToVote.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');
// Calculate responsive proportions
const vw = width / 100; // 1% of viewport width
const vh = height / 100; // 1% of viewport height

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 5 * vw, // 5% of screen width
    paddingTop: 3 * vh, // 3% of screen height
    paddingBottom: 3 * vh, // 3% of screen height
    justifyContent: 'space-between', // Key for even distribution
  },
  headerSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 3 * vh, // 3% of screen height
  },
  title: {
    fontSize: Math.min(24, 6 * vw), // Responsive font size
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 1.5 * vh, // 1.5% of screen height
  },
  subtitle: {
    fontSize: Math.min(16, 4 * vw), // Responsive font size
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginBottom: 2 * vh, // 2% of screen height
  },
  eligibilityList: {
    width: '100%',
    marginVertical: 1 * vh, // 1% of screen height
  },
  eligibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1.5 * vh, // 1.5% of screen height
  },
  checkmarkCircle: {
    width: Math.min(24, 6 * vw), // Responsive size
    height: Math.min(24, 6 * vw), // Responsive size
    borderRadius: Math.min(12, 3 * vw), // Half of width/height
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2 * vw, // 2% of screen width
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: Math.min(16, 4 * vw), // Responsive font size
  },
  eligibilityText: {
    fontSize: Math.min(16, 4 * vw), // Responsive font size
    color: COLORS.dark,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 4,
    marginBottom: 2 * vh, // 2% of screen height
    width: '100%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 1.5 * vh, // 1.5% of screen height
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButtonText: {
    color: COLORS.dark + 'AA',
    fontWeight: '500',
    fontSize: Math.min(14, 3.5 * vw), // Responsive font size
  },
  activeTabButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    minHeight: 30 * vh, // 30% of screen height - key to filling space
    marginBottom: 3 * vh, // 3% of screen height
  },
  tabContent: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Math.min(18, 4.5 * vw), // Responsive font size
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 1 * vh, // 1% of screen height
    alignSelf: 'flex-start',
  },
  sectionDescription: {
    fontSize: Math.min(14, 3.5 * vw), // Responsive font size
    color: COLORS.dark + 'CC',
    marginBottom: 2 * vh, // 2% of screen height
    lineHeight: Math.min(20, 5 * vw), // Responsive line height
  },
  provinceSelector: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 1.5 * vh, // 1.5% of screen height
    width: '100%',
    alignItems: 'center',
    marginBottom: 2 * vh, // 2% of screen height
  },
  provinceSelectorText: {
    color: COLORS.primary,
    fontSize: Math.min(16, 4 * vw), // Responsive font size
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    width: '100%',
    marginBottom: 2 * vh, // 2% of screen height
    overflow: 'hidden',
  },
  picker: {
    height: 6 * vh, // 6% of screen height
    width: '100%',
    color: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 1.5 * vh, // 1.5% of screen height
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: Math.min(16, 4 * vw), // Responsive font size
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 2 * vh, // 2% of screen height
    marginTop: 'auto', // Push to bottom of available space
  },
  continueButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 1.8 * vh, // 1.8% of screen height
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    maxWidth: 300,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: Math.min(18, 4.5 * vw), // Responsive font size
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.7,
  },
});