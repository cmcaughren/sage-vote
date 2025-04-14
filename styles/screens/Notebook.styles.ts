// styles/screens/Notebook.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  fixedHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.dark, // Changed to dark
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    right: 16,
    top: 20,
    padding: 5,
  },
  backButtonText: {
    color: COLORS.dark, // Changed to dark
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20, // Less padding as clear button is inside the list now
  },
  entryCard: {
    backgroundColor: COLORS.white,
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
    borderLeftColor: COLORS.primary, // Sage accent
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryUrl: {
    fontSize: 14,
    color: COLORS.info, // Periwinkle for URL
    flex: 1,
    marginRight: 8,
    fontStyle: 'italic',
  },
  entryDate: {
    fontSize: 12,
    color: COLORS.dark + '80',
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
    color: COLORS.dark,
  },
  arrowContainer: {
    backgroundColor: COLORS.info, // Periwinkle arrow container
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '', // Darker sage background (40% opacity)
    padding: 12,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary, // Sage accent
    opacity: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  sectionToggle: {
    fontSize: 16, // Increased from 12 for better visibility
    color: COLORS.white,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationModal: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.dark,
  },
  confirmationText: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.gray[700],
    marginBottom: 20,
    lineHeight: 20,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmationButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.gray[200],
  },
  cancelButtonText: {
    color: COLORS.dark,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: COLORS.error,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default styles;