// styles/screens/RegisterToVote.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 70,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 5 * vw,
    paddingTop: 3 * vh,
    paddingBottom: 3 * vh,
    // Use flex layout with specific distribution
    display: 'flex',
    flexDirection: 'column',
  },
  headerSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 4 * vh, // Increased space below header
  },
  title: {
    fontSize: Math.min(24, 6 * vw),
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 2 * vh,
  },
  subtitle: {
    fontSize: Math.min(16, 4 * vw),
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginBottom: 3 * vh,
  },
  eligibilityList: {
    width: '100%',
    marginBottom: 3 * vh, // Increased space after checklist
  },
  eligibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2 * vh,
  },
  checkmarkCircle: {
    width: Math.min(24, 6 * vw),
    height: Math.min(24, 6 * vw),
    borderRadius: Math.min(12, 3 * vw),
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2 * vw,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: Math.min(16, 4 * vw),
  },
  eligibilityText: {
    fontSize: Math.min(16, 4 * vw),
    color: COLORS.dark,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 4,
    marginBottom: 4 * vh, // Increased space after tabs
    width: '100%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 1.5 * vh,
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
    fontSize: Math.min(14, 3.5 * vw),
  },
  activeTabButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  contentWrapper: {
    width: '100%',
    // No minHeight - let it grow naturally
    marginBottom: 5 * vh, // More space after content
    flex: 1, // Take available space
  },
  tabContent: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Math.min(18, 4.5 * vw),
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2 * vh, // More space after title
    alignSelf: 'flex-start',
  },
  sectionDescription: {
    fontSize: Math.min(14, 3.5 * vw),
    color: COLORS.dark + 'CC',
    marginBottom: 4 * vh, // More space after description
    lineHeight: Math.min(20, 5 * vw),
  },
  provinceSelector: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 1.5 * vh,
    width: '100%',
    alignItems: 'center',
    marginBottom: 4 * vh, // More space after selector
  },
  provinceSelectorText: {
    color: COLORS.primary,
    fontSize: Math.min(16, 4 * vw),
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    width: '100%',
    marginBottom: 2 * vh, // More space after picker
    overflow: 'hidden',
  },
  picker: {
    height: 6 * vh,
    width: '100%',
    color: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 1.8 * vh,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 2 * vh, // Add significant space after action button
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: Math.min(16, 4 * vw),
    fontWeight: '600',
  },
  buttonContainer: {
    //position: 'absolute',
    //bottom: 20,
    //left: '5%', // 5% from left
    //right: '5%', // 5% from right

    //paddingVertical: 15,
    backgroundColor: COLORS.background, // Ensure it has background
    // No width setting - let it be determined by left/right
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    //display: 'flex',
    //flexDirection: 'row',
    //justifyContent: 'center', // Center the child horizontally
  },
  continueButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 1.8 * vh,
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
    fontSize: Math.min(18, 4.5 * vw),
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.7,
  },
});