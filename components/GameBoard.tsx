// components/GameBoard.tsx
import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useGameContext } from '../context/GameContext';
import { styles, PATH_COLORS, EMOJI } from '../styles/components/GameBoard.styles';
import { COLORS } from '../styles/theme/colors';


const GameBoard = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const {
    transportMode,
    boardPosition,
    pathData,
    tileSize: contextTileSize,
    verticalSpacingFactor,
  } = useGameContext();

  // Validate data
  if (!pathData || !transportMode) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading game board...</Text>
      </View>
    );
  }

  // Get all paths
  const busPath = pathData.bus || [];
  const carpoolPath = pathData.carpool || [];
  const bicyclePath = pathData.bicycle || [];

  // Calculate bounds of all paths to find centering offset
  const calculateBoardBounds = () => {
    // Combine all path tiles
    const allTiles = [...busPath, ...carpoolPath, ...bicyclePath];

    if (allTiles.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };

    // Find boundaries
    const minX = Math.min(...allTiles.map(tile => tile.x));
    const maxX = Math.max(...allTiles.map(tile => tile.x));
    const minY = Math.min(...allTiles.map(tile => tile.y));
    const maxY = Math.max(...allTiles.map(tile => tile.y));

    // Calculate size
    const width = maxX - minX;
    const height = maxY - minY;

    return { minX, maxX, minY, maxY, width, height };
  };

  // Calculate once and memoize
  const bounds = useMemo(calculateBoardBounds, [busPath, carpoolPath, bicyclePath]);

  // Calculate tile size to fit within screen bounds
  const calculateTileSize = () => {
    // Calculate how many tiles we need to fit horizontally and vertically
    const horizontalTiles = 12; // From your original grid
    const verticalTiles = 14;   // From your original grid

    // Calculate available space (accounting for header and footer)
    const availableWidth = screenWidth * 0.95;
    const availableHeight = screenHeight * 0.6 * 0.95; // 95% of the 60% screen container

    // Calculate optimal size to fit everything
    const widthBased = availableWidth / horizontalTiles;
    const heightBased = availableHeight / (verticalTiles * verticalSpacingFactor);

    return Math.min(widthBased, heightBased);
  };

  const tileSize = calculateTileSize();

  const offsetX = screenWidth / 2 - (bounds.minX + bounds.maxX) / 2;
  const offsetY = (screenHeight * 0.6); // - bounds.minY;
  //(screenHeight * 0.6) / 2 - (bounds.minY + bounds.maxY) / 2;

  // Render tile with proper positioning
  const renderTile = (pathType, tile, index, isActive) => {
    const pathColors = PATH_COLORS[pathType] || ['#cccccc'];
    const colorIndex = index % pathColors.length;
    const bgColor = pathColors[colorIndex] || '#cccccc';

    const isActivePath = pathType === transportMode;
    const isCurrentTile = isActivePath && index === boardPosition;
    const isSpecialTile = tile.type === 'start' || tile.type === 'finish';

    // Calculate tile size adjustments
    const sizeMultiplier = isCurrentTile ? 1.15 : 1;
    const adjustedTileSize = tileSize * sizeMultiplier;

    // Get appropriate corner styling
    let borderRadius = {};
    switch (tile.corner) {
      case 'top-right': borderRadius = { borderTopRightRadius: adjustedTileSize * 0.8 }; break;
      case 'top-left': borderRadius = { borderTopLeftRadius: adjustedTileSize * 0.8 }; break;
      case 'bottom-right': borderRadius = { borderBottomRightRadius: adjustedTileSize * 0.8 }; break;
      case 'bottom-left': borderRadius = { borderBottomLeftRadius: adjustedTileSize * 0.8 }; break;
      default: borderRadius = { borderRadius: adjustedTileSize * 0.2 };
    }

    // Add styling for active tiles
    let glowColor = '#FFD700'; // Default yellow
    if (pathType === 'carpool') glowColor = COLORS.error;
    else if (pathType === 'bus') glowColor = COLORS.info;
    else if (pathType === 'bicycle') glowColor = '#c0bc00';

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

              // Position with dynamic offset
              left: tile.x - (adjustedTileSize / 2) + offsetX,
              top: tile.y - (adjustedTileSize / 2) + offsetY,

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
            <Text style={[styles.tileNumber, { fontSize: Math.max(8, tileSize * 0.3) }]}>
              {tile.id}
            </Text>
          )}
        </View>

        {/* Player token */}
        {isCurrentTile && (
          <View style={[
            styles.playerTokenContainer,
            {
              left: tile.x - (tileSize * 0.45) + offsetX,
              top: tile.y - (tileSize * 0.45) + offsetY,
              width: tileSize * 0.9,
              height: tileSize * 0.9,
              zIndex: 25,
            }
          ]}>
            <Text style={[styles.emojiText, {
              fontSize: Math.max(20, tileSize * 0.7)
            }]}>
              {pathType === 'bus' ? EMOJI.bus :
                pathType === 'carpool' ? EMOJI.carpool : EMOJI.bicycle}
            </Text>
          </View>
        )}

        {/* Special tile label */}
        {isSpecialTile && isActivePath && (
          <View style={{
            position: 'absolute',
            left: tile.x - (tileSize * 0.5) + offsetX,
            // Position special icons above/below tiles
            top: tile.type === 'start'
              ? (tile.y * verticalSpacingFactor) + (tileSize * 1.5) + offsetY
              : (tile.y * verticalSpacingFactor) - (tileSize * 1.5) + offsetY,
            zIndex: 30,
            alignItems: 'center',
            width: tileSize,
          }}>
            <Text style={{
              fontSize: Math.min(32, tileSize * 0.8),
              textAlign: 'center',
            }}>
              {tile.type === 'start' ? '🏠' : '🗳️'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Render paths from bottom to top for layering
  const pathsToRender = [
    { type: 'bicycle', tiles: bicyclePath },
    { type: 'carpool', tiles: carpoolPath },
    { type: 'bus', tiles: busPath }
  ].filter(path => Array.isArray(path.tiles) && path.tiles.length > 0);

  return (
    <View style={styles.container}>
      <View style={styles.board}>
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