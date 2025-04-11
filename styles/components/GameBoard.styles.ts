// styles/components/GameBoard.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

// Get screen dimensions for responsive sizing
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const vw = screenWidth / 100; // 1% of viewport width
const vh = screenHeight / 100; // 1% of viewport height

// Calculate responsive base size
const baseTileSize = Math.min(screenWidth / 14, screenHeight / 18);

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
    width: '100%',
  },
  board: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    // Add this transform to center the board
    //transform: [{ translateX: -screenWidth * 0.12 }], // Adjust as needed
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
    overflow: 'visible',
  },
  activeTile: {
    zIndex: 10,
  },
  tileNumber: {
    fontSize: Math.max(8, baseTileSize * 0.25), // Responsive font size
    color: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 2,
    left: 2,
  },
  specialEmoji: {
    fontSize: Math.max(16, baseTileSize * 0.6), // Responsive font size
    opacity: 0.8,
    zIndex: 6,
  },
  // Responsive player token container
  playerTokenContainer: {
    position: 'absolute',
    width: Math.max(24, baseTileSize * 0.9), // Responsive size
    height: Math.max(24, baseTileSize * 0.9), // Responsive size
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: Math.max(20, baseTileSize * 0.8), // Responsive font size
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});