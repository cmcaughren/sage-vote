// styles/components/ui/NotebookIcon.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  iconContainer: {
    position: 'relative',
  },
  iconBackground: {
    backgroundColor: COLORS.tertiaryLight,
    borderRadius: 24, // Increased from 18
    width: 48, // Increased from 36
    height: 48, // Increased from 36
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    fontSize: 28,
  },
  badge: {
    position: 'absolute',
    top: -8, // Adjusted position
    right: -12, // Adjusted position
    backgroundColor: COLORS.secondary,
    borderRadius: 14, // Increased from 12
    minWidth: 28, // Increased from 24
    height: 28, // Increased from 24
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: '500',
  }
});

export default styles;