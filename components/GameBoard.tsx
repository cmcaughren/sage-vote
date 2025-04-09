// components/GameBoard.tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useGameContext } from '../context/GameContext';
import { styles, PATH_COLORS, EMOJI } from '../styles/components/GameBoard.styles';
import { COLORS } from '../styles/theme/colors';

const GameBoard = () => {
  const {
    transportMode,
    boardPosition,
    pathData,
    tileSize,
    verticalSpacingFactor,
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

  // Grid calculation function - recreates grid from pathCalculations.js
  const calculateGridPosition = (gridX, gridY) => {
    // This recreates the same grid calculation used in pathCalculations.js
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height * 0.75;

    // Calculate tile sizes consistent with pathCalculations.js
    const calculatedTileSize = Math.min(screenWidth / 12, screenHeight / 14);

    // Return the exact X,Y coordinates for the given grid position
    return {
      x: (gridX + 0.5) * calculatedTileSize,
      y: (gridY + 0.5) * calculatedTileSize * verticalSpacingFactor
    };
  };

  // Function to render special labels for start/finish tiles
  const renderSpecialTileLabel = (tileType) => {
    // Get the grid coordinates for the labels based on known start/finish positions
    let labelGridPos;

    if (tileType === 'start') {
      // Move Home icon further down and make it bigger
      labelGridPos = calculateGridPosition(6, 13); // 
    } else if (tileType === 'finish') {
      // Poll should be at grid position (5,0) - above the finish tile at (5,1)
      labelGridPos = calculateGridPosition(5, 0);
    }

    return (
      <View
        style={{
          position: 'absolute',
          left: labelGridPos.x - (tileSize * 0.5),
          top: labelGridPos.y - (tileSize * 0.5),
          zIndex: 30, // Increased from 20 to ensure it's on top
          alignItems: 'center',
          width: tileSize, // * vertical,
          // Add a visible background to debug
          backgroundColor: tileType === 'start' ? 'rgba(255,255,255,0.3)' : 'transparent',
        }}
      >
        {/* For finish/poll, render text first (above) 
        {tileType === 'finish' && (
          <Text style={{
            fontSize: 14,
            color: COLORS.info,
            fontWeight: 'bold',
            marginBottom: 4,
            textAlign: 'center',
          }}>
            Poll
          </Text>
        )}
*/}
        {/* Emoji */}
        <Text style={{
          fontSize: 24,
          textAlign: 'center',
        }}>
          {tileType === 'start' ? '🏠' : '🗳️'}
        </Text>

        {/* For start/home, render text last (below) 
        {tileType === 'start' && (
          <Text style={{
            fontSize: 14,
            color: COLORS.info,
            fontWeight: 'bold',
            marginTop: 4,
            textAlign: 'center',
          }}>
            Home
          </Text>
        )}*/}
      </View>
    );
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
    const isSpecialTile = tile.type === 'start' || tile.type === 'finish';

    // Calculate tile size adjustments
    // Make current tile slightly larger (1.15x)
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

    // Fixed condition to show special emoji
    const showSpecialEmoji =
      // For the start tile (Home), only show for the active transport path
      (tile.type === 'start' && pathType === transportMode) ||
      // For the finish tile (Poll), only show for the active transport path
      (tile.type === 'finish' && pathType === transportMode);

    // POPPING UP EFFECT: Modify the shadow to create a raised appearance
    const glowParams = isActivePath ? {
      shadowColor: glowColor,
      shadowOffset: { width: -1, height: -1 }, // Changed to negative for "pop up" effect
      shadowOpacity: isCurrentTile ? 0.95 : 0.85, // Stronger glow for current tile
      shadowRadius: isCurrentTile ? 10 : 7, // Larger radius for current tile
      elevation: isCurrentTile ? 15 : 10, // Higher elevation for current tile on Android
    } : {
      // Default shadow for non-active paths - also make them pop up
      shadowColor: COLORS.black,
      shadowOffset: { width: -1, height: -1 }, // Changed to negative
      shadowOpacity: 0.4, // Increased opacity
      shadowRadius: 3, // Slightly increased radius
      elevation: 4, // Increased elevation
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

    return (
      <View key={`tile-${pathType}-${tile.id}`}>
        {/* Tile square */}
        <View
          style={[
            styles.tile,
            {
              width: adjustedTileSize,
              height: adjustedTileSize,
              backgroundColor: isSpecialTile ? COLORS.primary : bgColor, // Sage for start/finish
              left: tile.x - adjustedTileSize / 2,
              top: tile.y - adjustedTileSize / 2,
              opacity: isActivePath ? 1 : 0.6,
              ...borderRadius,
              ...glowParams, // Apply the glow effect
              ...highlightEffect, // Add highlight for "pop up" appearance

              // Add back the default border for ALL tiles
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.5)', // Light border for all tiles

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

        {/* Render Home icon explicitly here as a fallback 
         {transportMode && (
          <View
            style={{
              position: 'absolute',
              left: calculateGridPosition(6, 14).x - (tileSize * 0.75),
              top: calculateGridPosition(6, 14).y - (tileSize * 0.75),
              zIndex: 50,
              alignItems: 'center',
              width: tileSize * 1.5,
            }}
          >
            <Text style={{ fontSize: 24, textAlign: 'center' }}>🏠</Text>
            <Text style={{
              fontSize: 14,
              color: COLORS.info,
              fontWeight: 'bold',
              marginTop: 4,
              textAlign: 'center',
            }}>
              Home
            </Text>
          </View>
        )}
        */}
      </View >
    </View >
  );
};

export default GameBoard;