// styles/components/GameBoard.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Path colors
export const PATH_COLORS = {
  bus: COLORS.busPath.shades,
  carpool: COLORS.carpoolPath.shades,
  bicycle: COLORS.bicyclePath.shades
};

// Emoji constants
export const EMOJI = {
  start: '🏠',
  bus: '🚌',
  carpool: '🚗',
  bicycle: '🚲',
  finish: '🗳️',
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  board: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 2,
  },
  activeTile: {
    zIndex: 10,
    borderWidth: 1.5,
  },
  tileNumber: {
    color: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 2,
    left: 2,
  },
  specialEmoji: {
    opacity: 0.8,
    zIndex: 6,
  },
  playerTokenContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 25,
  },
  emojiText: {
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});