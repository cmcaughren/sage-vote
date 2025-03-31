// components/GameBoard.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useGameContext } from '../context/GameContext';
import { styles, PATH_COLORS, EMOJI } from '../styles/components/GameBoard.styles';

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

    // Choose color based on index to create color variation
    const colorIndex = index % (pathColors.length || 1);
    const bgColor = pathColors[colorIndex] || '#cccccc';

    // Calculate tile size adjustments
    const tileSizeMultiplier = pathType === transportMode ? 1.1 : 0.9;
    const adjustedTileSize = (tileSize || 30) * tileSizeMultiplier;

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

    const opacity = pathType === transportMode ? 1 : 0.6;

    return (
      <View key={`tile-${pathType}-${tile.id}`}>
        {/* Tile square */}
        <View
          style={[
            styles.tile,
            {
              width: adjustedTileSize,
              height: adjustedTileSize,
              backgroundColor: bgColor,
              left: tile.x - adjustedTileSize / 2,
              top: tile.y - adjustedTileSize / 2,
              opacity,
              ...borderRadius
            },
            isActive && pathType === transportMode && styles.activeTile,
            // Special styling for common start/finish tiles
            tile.type === 'start' && { borderColor: '#FFD700', borderWidth: 3, zIndex: 5 },
            tile.type === 'finish' && { borderColor: '#FFD700', borderWidth: 3, zIndex: 5 }
          ]}
        >
          <Text style={styles.tileNumber}>{tile.id}</Text>

          {/* Special emoji below player icon */}
          {showSpecialEmoji && (
            <Text style={styles.specialEmoji}>
              {tile.type === 'start' ? EMOJI.start : EMOJI.finish}
            </Text>
          )}
        </View>

        {/* Player token - now separate from tile and with higher z-index */}
        {isActive && pathType === transportMode && (
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