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
    flexDirection: 'row', // Change to row to position elements horizontally
    justifyContent: 'center', // Center the title
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
    position: 'relative',
  },
  title: {
    fontSize: 28, // Match other screen title sizes
    fontWeight: 'bold',
    color: COLORS.info, // Periwinkle color to match other titles
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Extra space at bottom for buttons
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
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  entryUrl: {
    fontSize: 14,
    color: COLORS.info, // Periwinkle color
    flex: 1,
    marginRight: 8,
    fontStyle: 'italic',
  },
  entryDate: {
    fontSize: 12,
    color: COLORS.gray[600],
  },
  entryDescription: {
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 12,
    lineHeight: 22,
  },
  linkContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: COLORS.info + '20', // Light periwinkle
    borderRadius: 12,
  },
  linkText: {
    fontSize: 12,
    color: COLORS.info, // Periwinkle
    fontWeight: '600',
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
    backgroundColor: COLORS.info + '15', // Very light periwinkle
    padding: 12,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  sectionToggle: {
    fontSize: 12,
    color: COLORS.info,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    right: 16,
    top: 20,
    padding: 5,
  },
  backButtonText: {
    color: COLORS.info,
    fontSize: 16,
    fontWeight: '500',
  },
  clearButton: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: '5%',
    backgroundColor: COLORS.error,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '90%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles for confirmation dialog
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