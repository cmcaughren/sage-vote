// styles/screens/Notebook.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { INTERNAL_CALLSITES_REGEX } from '@expo/metro-config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  entryCard: {
    backgroundColor: COLORS.white, //"#fff2f1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.tertiaryLight, // salmon border
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryUrl: {
    fontSize: 14,
    color: COLORS.error, // dark coral
    flex: 1,
    marginRight: 8,
    fontStyle: 'italic',
  },
  entryDate: {
    fontSize: 12,
    color: COLORS.dark + '80', // Adding transparency
  },
  entryDescription: {
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 12,
    lineHeight: 22,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 10,
    marginTop: 5,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.dark, // Deep Coral
  },
  arrowContainer: {
    backgroundColor: COLORS.info, // Dark periwinkle
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.dark + '80',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.dark,
  },
  emptySubtext: {
    fontSize: 16,
    color: COLORS.dark + '80',
    textAlign: 'center',
    lineHeight: 22,
  },
  clearButton: {
    backgroundColor: COLORS.error,
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.accent2,//COLORS.info + '15',
    padding: 12,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  sectionToggle: {
    fontSize: 18,
    color: COLORS.info, // Deep periwinkle for toggle arrow
    fontWeight: 'bold',
  },
});

export default styles;