// styles/screens/RegisterToVote.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerSection: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginBottom: 20,
  },
  eligibilityList: {
    width: '100%',
    marginTop: 15,
  },
  eligibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.secondary, // Golden yellow for checkmarks
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  eligibilityText: {
    fontSize: 16,
    color: COLORS.dark,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
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
  },
  activeTabButtonText: {
    color: COLORS.primary, // Sage green
    fontWeight: '600',
  },
  tabContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.dark + 'CC',
    marginBottom: 20,
    lineHeight: 20,
  },
  provinceSelector: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary, // Sage green
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  provinceSelectorText: {
    color: COLORS.primary, // Sage green
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary, // Sage green
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.primary, // Sage green
  },
  actionButton: {
    backgroundColor: COLORS.primary, // Sage green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: COLORS.secondary, // Golden yellow
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    width: '80%',
    maxWidth: 300,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.7,
  },
});

export default styles;