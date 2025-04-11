// components/GameBoard.tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useGameContext } from '../context/GameContext';
import { styles, PATH_COLORS, EMOJI } from '../styles/components/GameBoard.styles';
import { COLORS } from '../styles/theme/colors';

const GameBoard = () => {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const {
    transportMode,
    boardPosition,
    pathData,
    tileSize: contextTileSize,
    verticalSpacingFactor,
  } = useGameContext();

  // Calculate a responsive tile size based on screen dimensions
  const calculateResponsiveTileSize = () => {
    // The available space for the board (accounting for some padding)
    const availableWidth = screenWidth * 0.95;
    const availableHeight = screenHeight * 0.7; // Assuming board takes ~70% of screen height

    // Calculate a size that would let all tiles fit
    const horizontalTileCount = 12;
    const verticalTileCount = 14;

    // Return the smaller of the two calculations to ensure it fits
    return Math.min(
      availableWidth / horizontalTileCount,
      availableHeight / verticalTileCount / verticalSpacingFactor
    );
  };

  // Use the responsive tile size or fall back to the context one
  const responsiveTileSize = calculateResponsiveTileSize() || contextTileSize;

  // Check if we have valid data before proceeding
  if (!pathData || !PATH_COLORS) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading game board...</Text>
      </View>
    );
  }

  // Get the right paths from context with safe fallbacks
  const busPath = pathData.bus || [];
  const carpoolPath = pathData.carpool || [];
  const bicyclePath = pathData.bicycle || [];

  // Function to get the active path based on transport mode
  const getActivePath = () => {
    switch (transportMode) {
      case 'bus': return busPath;
      case 'carpool': return carpoolPath;
      case 'bicycle': return bicyclePath;
      default: return busPath;
    }
  };

  // Grid calculation function - recreates grid from pathCalculations.js with responsive sizing
  const calculateGridPosition = (gridX, gridY) => {
    // Return the exact X,Y coordinates for the given grid position with responsive sizing
    return {
      x: (gridX + 0.5) * responsiveTileSize,
      y: (gridY + 0.5) * responsiveTileSize * verticalSpacingFactor
    };
  };

  // Function to render special labels for start/finish tiles
  const renderSpecialTileLabel = (tileType) => {
    // Get the grid coordinates for the labels based on known start/finish positions
    let labelGridPos;

    if (tileType === 'start') {
      labelGridPos = calculateGridPosition(6, 13);
    } else if (tileType === 'finish') {
      labelGridPos = calculateGridPosition(5, 0);
    }

    return (
      <View
        style={{
          position: 'absolute',
          left: labelGridPos.x - (responsiveTileSize * 0.5),
          top: labelGridPos.y - (responsiveTileSize * 0.5),
          zIndex: 30,
          alignItems: 'center',
          width: responsiveTileSize,
        }}
      >
        {/* Emoji */}
        <Text style={{
          fontSize: Math.min(32, responsiveTileSize * 0.8), // Responsive emoji size
          textAlign: 'center',
        }}>
          {tileType === 'start' ? '🏠' : '🗳️'}
        </Text>
      </View>
    );
  };

  // Render a single tile based on its properties - with responsive sizing
  const renderTile = (pathType, tile, index, isActive) => {
    // Get colors based on path type with safe fallback
    const pathColors = PATH_COLORS[pathType] || ['#cccccc'];

    // Get highlight color based on path type
    let glowColor = '#FFD700'; // Default yellow
    if (pathType === transportMode) {
      if (pathType === 'carpool') glowColor = COLORS.error;
      else if (pathType === 'bus') glowColor = COLORS.info;
      else if (pathType === 'bicycle') glowColor = '#c0bc00';
    }

    // Choose color based on index to create color variation
    const colorIndex = index % (pathColors.length || 1);
    const bgColor = pathColors[colorIndex] || '#cccccc';

    const isActivePath = pathType === transportMode;
    const isCurrentTile = isActivePath && index === boardPosition;
    const isSpecialTile = tile.type === 'start' || tile.type === 'finish';

    // Calculate tile size adjustments - respecting screen size
    const sizeMultiplier = isCurrentTile ? 1.15 : 1;
    const adjustedTileSize = responsiveTileSize * sizeMultiplier;

    // Apply different styling based on corner type
    let borderRadius = {};

    // Get border radius based on corner type
    switch (tile.corner) {
      case 'top-right':
        borderRadius = {
          borderTopRightRadius: adjustedTileSize * 0.8,
        };
        break;
      case 'top-left':
        borderRadius = {
          borderTopLeftRadius: adjustedTileSize * 0.8,
        };
        break;
      case 'bottom-right':
        borderRadius = {
          borderBottomRightRadius: adjustedTileSize * 0.8,
        };
        break;
      case 'bottom-left':
        borderRadius = {
          borderBottomLeftRadius: adjustedTileSize * 0.8,
        };
        break;
      default:
        borderRadius = { borderRadius: adjustedTileSize * 0.2 };
    }

    // Fixed condition to show special emoji
    const showSpecialEmoji =
      (tile.type === 'start' && pathType === transportMode) ||
      (tile.type === 'finish' && pathType === transportMode);

    // POPPING UP EFFECT: Modify the shadow to create a raised appearance
    const glowParams = isActivePath ? {
      shadowColor: glowColor,
      shadowOffset: { width: -1, height: -1 },
      shadowOpacity: isCurrentTile ? 0.95 : 0.85,
      shadowRadius: isCurrentTile ? 10 : 7,
      elevation: isCurrentTile ? 15 : 10,
    } : {
      shadowColor: COLORS.black,
      shadowOffset: { width: -1, height: -1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 4,
    };

    // Add highlight effect on opposite sides to enhance "pop up" appearance
    const highlightEffect = {
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.8)',
      borderLeftColor: 'rgba(255,255,255,0.8)',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderRightColor: 'rgba(0,0,0,0.1)',
      borderBottomColor: 'rgba(0,0,0,0.1)',
    };

    return (
      <View key={`tile-${pathType}-${tile.id}`}>
        {/* Tile square */}
        <View
          style={[
            styles.tile,
            {
              width: adjustedTileSize,
              height: adjustedTileSize,
              backgroundColor: isSpecialTile ? COLORS.primary : bgColor,
              left: tile.x - adjustedTileSize / 2,
              top: tile.y - adjustedTileSize / 2,
              opacity: isActivePath ? 1 : 0.6,
              ...borderRadius,
              ...glowParams,
              ...highlightEffect,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.5)',
              ...(isCurrentTile && {
                borderWidth: 1.5,
                borderColor: glowColor,
                zIndex: 15,
              }),
            },
            isSpecialTile && {
              borderColor: COLORS.primary,
              borderWidth: 3,
              zIndex: 5,
              shadowColor: COLORS.primary,
              shadowOpacity: 0.8,
              shadowRadius: 6,
            }
          ]}
        >
          {/* Only show numbers on regular tiles, not on special tiles */}
          {!isSpecialTile && (
            <Text style={[styles.tileNumber, { fontSize: Math.max(8, responsiveTileSize * 0.3) }]}>
              {tile.id}
            </Text>
          )}
        </View>

        {/* Player token - keep this separate for proper layering */}
        {isCurrentTile && (
          <View style={[
            styles.playerTokenContainer,
            {
              left: tile.x - responsiveTileSize * 0.45,
              top: tile.y - responsiveTileSize * 0.45,
              width: responsiveTileSize * 0.9,
              height: responsiveTileSize * 0.9,
              zIndex: 25,
            }
          ]}>
            <Text style={[styles.emojiText, {
              fontSize: Math.max(20, responsiveTileSize * 0.7)
            }]}>
              {transportMode === 'bus' ? EMOJI.bus :
                transportMode === 'carpool' ? EMOJI.carpool : EMOJI.bicycle}
            </Text>
          </View>
        )}

        {/* Special label using grid-based positioning */}
        {showSpecialEmoji && renderSpecialTileLabel(tile.type)}
      </View>
    );
  };

  // Add safety checks before rendering
  const pathsToRender = [
    { type: 'bicycle', tiles: bicyclePath },
    { type: 'carpool', tiles: carpoolPath },
    { type: 'bus', tiles: busPath }
  ].filter(path => Array.isArray(path.tiles) && path.tiles.length > 0);

  return (
    <View style={[styles.container, { flex: 1, height: '90%' }]}>
      <View style={[styles.board, { height: '100%' }]}>
        {/* Render all paths - bottom to top for proper layering */}
        {pathsToRender.map(path =>
          path.tiles.map((tile, index) =>
            renderTile(
              path.type,
              tile,
              index,
              path.type === transportMode && index === boardPosition
            )
          )
        )}
      </View>
    </View>
  );
};

export default GameBoard;