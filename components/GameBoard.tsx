// components/GameBoard.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useGameContext } from '../context/GameContext';
import { styles, PATH_COLORS, EMOJI } from '../styles/components/GameBoard.styles';
import { COLORS } from '../styles/theme/colors';

const GameBoard = () => {
  const {
    transportMode,
    boardPosition,
    pathData,
    tileSize
  } = useGameContext();

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

  // Render a single tile based on its properties
  const renderTile = (pathType, tile, index, isActive) => {
    // Get colors based on path type with safe fallback
    const pathColors = PATH_COLORS[pathType] || ['#cccccc'];

    // Get highlight color based on path type
    let glowColor = '#FFD700'; // Default yellow
    if (pathType === transportMode) {
      if (pathType === 'carpool') glowColor = COLORS.error;
      else if (pathType === 'bus') glowColor = COLORS.info;
      else if (pathType === 'bicycle') glowColor = '#c0bc00';//COLORS.warning;
    }

    // Choose color based on index to create color variation
    const colorIndex = index % (pathColors.length || 1);
    const bgColor = pathColors[colorIndex] || '#cccccc';

    const isActivePath = pathType === transportMode;
    const isCurrentTile = isActivePath && index === boardPosition;

    // MOVE THIS SECTION UP - Calculate tile size adjustments first!
    const sizeMultiplier = isCurrentTile ? 1.15 : 1;
    const adjustedTileSize = (tileSize || 30) * sizeMultiplier;

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

    // Only render visible special emoji on start and finish of active path
    const showSpecialEmoji =
      (tile.type === 'start' && (pathType === transportMode || (transportMode === null && pathType === 'bus'))) ||
      (tile.type === 'finish' && (pathType === transportMode || (transportMode === null && pathType === 'bus')));

    // Create glow effect parameters 
    const glowParams = isActivePath ? {
      shadowColor: glowColor,
      shadowOffset: { width: -1, height: -1 }, //Changed to negative for "pop up" effect
      shadowOpacity: isCurrentTile ? 0.95 : 0.85, // Stronger glow for current tile
      shadowRadius: isCurrentTile ? 10 : 7, // Larger radius for current tile
      elevation: isCurrentTile ? 15 : 10, // Higher elevation for current tile on Android
    } : {
      // Default shadow for non-active paths
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
      borderTopColor: 'rgba(255,255,255,0.8)', // Lighter top border
      borderLeftColor: 'rgba(255,255,255,0.8)', // Lighter left border
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderRightColor: 'rgba(0,0,0,0.1)', // Darker right border
      borderBottomColor: 'rgba(0,0,0,0.1)', // Darker bottom border
    };

    // Determine if this is a start/finish tile
    const isSpecialTile = tile.type === 'start' || tile.type === 'finish';
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
              ...glowParams, // Apply the glow effect
              ...highlightEffect, // Add highlight effect for "pop up" appearance
              // Add back the default border for ALL tiles
              //borderWidth: 1,
              //borderColor: 'rgba(255,255,255,0.5)', // Light border for all tiles

              // For current tile: thinner border in glow color
              ...(isCurrentTile && {
                borderWidth: 1.5, // Thinner border (was 3)
                borderColor: glowColor,
                zIndex: 15, // Higher z-index to ensure it stays on top
              }),
            },
            // Special styling for start/finish tiles - now sage colored
            isSpecialTile && {
              borderColor: COLORS.primary, // Sage border instead of gold
              borderWidth: 3,
              zIndex: 5,
              shadowColor: COLORS.primary, // Sage glow
              shadowOpacity: 0.8,
              shadowRadius: 6,
            }
          ]}
        >
          {/* Only show numbers on regular tiles, not on special tiles */}
          {!isSpecialTile && (
            <Text style={styles.tileNumber}>{tile.id}</Text>
          )}
        </View>

        {/* Player token - keep this separate for proper layering */}
        {isCurrentTile && (
          <View style={[
            styles.playerTokenContainer,
            {
              left: tile.x - 15,
              top: tile.y - 15,
              zIndex: 25, // Higher than any other element
            }
          ]}>
            <Text style={styles.emojiText}>
              {transportMode === 'bus' ? EMOJI.bus :
                transportMode === 'carpool' ? EMOJI.carpool : EMOJI.bicycle}
            </Text>
          </View>
        )}
        {/* REPOSITIONED: Special emojis outside tiles */}
        {showSpecialEmoji && (
          <View
            style={{
              position: 'absolute',
              left: tile.type === 'start' ? tile.x - 30 : tile.x + 5, // Left of start, right of finish
              top: tile.type === 'start' ? tile.y + 30 : tile.y - 30, // Below start, above finish
              zIndex: 20,
              backgroundColor: COLORS.primary + '40', // Semi-transparent sage background
              padding: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.primary,
            }}
          >
            <Text style={{
              fontSize: 20,
              textAlign: 'center',
            }}>
              {tile.type === 'start' ? '🏠 Home' : '🗳️ Poll'}
            </Text>
          </View>
        )}
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
    <View style={styles.container}>
      <View style={styles.board}>
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