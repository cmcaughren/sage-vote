// styles/screens/Crossroads.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginBottom: 15,
    maxWidth: 400,
  },
  infoContainer: {
    backgroundColor: COLORS.primary + '20', // Light sage background
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    maxWidth: 400,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 20,
  },
  diceContainer: {
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
    marginTop: 5,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionEmoji: {
    fontSize: 20,
  },
  optionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 11,
    color: COLORS.dark + 'CC',
    fontWeight: '500',
    textAlign: 'center',
  },
  optionSubtext: {
    fontSize: 10,
    color: COLORS.dark + '80',
    marginTop: 2,
    textAlign: 'center',
  }
});

export default styles;