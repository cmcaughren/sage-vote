import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';

// Path colors - using colors from the theme
export const PATH_COLORS = {
  bus: COLORS.busPath.shades,
  carpool: COLORS.carpoolPath.shades,
  bicycle: COLORS.bicyclePath.shades
};

// Emoji constants
export const EMOJI = {
  start: '🏠',         // Home for crossroads
  bus: '🚌',           // Bus
  carpool: '🚗',       // Car
  bicycle: '🚲',       // Bicycle
  finish: '🗳️',        // Ballot box
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: COLORS.background, // Light background matching the logo's style
  },
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: SPACING.borderWidth.thin,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 2,
  },
  activeTile: {
    borderWidth: SPACING.borderWidth.thick,
    borderColor: '#FFD700',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10,
  },
  tileNumber: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 2,
    left: 2,
  },
  specialEmoji: {
    fontSize: 20,
    opacity: 0.8,
    zIndex: 6,
  },
  // Separate container for player token
  playerTokenContainer: {
    position: 'absolute',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 28,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});