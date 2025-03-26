import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useGameContext } from '../context/GameContext';
import { styles, PATH_COLORS, EMOJI } from '../styles/components/GameBoard.styles';

const GameBoard = () => {
  const { transportMode, boardPosition, setPathLengths } = useGameContext();
  
  // Get screen dimensions - adjust for buttons
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height * 0.55;
  
  // Calculate tile size for a good fit
  const tileSize = Math.min(screenWidth / 12, screenHeight / 14);
  
  // Create a grid system for positioning
  const grid = [];
  for(let x = 0; x <= 11; x++) {
    grid[x] = [];
    for(let y = 0; y <= 13; y++) {
      grid[x][y] = {
        x: (x + 0.5) * tileSize,
        y: (y + 0.5) * tileSize
      };
    }
  }
  
  // Create paths with grid-based approach
  const busPath = createBusPath(grid);
  const carpoolPath = createCarpoolPath(grid);
  const bicyclePath = createBicyclePath(grid);

  
  // Use useEffect to update the context once when component mounts
  React.useEffect(() => {
    setPathLengths({
      bus: busPath.tiles.length - 1,
      carpool: carpoolPath.tiles.length - 1,
      bicycle: bicyclePath.tiles.length - 1,
    });
  }, []);  // Empty dependency array ensures this runs only once

  // Bus path - following your specific directions
  function createBusPath(grid) {
    const tiles = [];
    let currentId = 0;
    
    // Start at (6,12)
    tiles.push({ id: currentId++, x: grid[6][12].x, y: grid[6][12].y, type: 'start', corner: 'none' });
    
    // Left 5 squares 1 -5
    tiles.push({ id: currentId++, x: grid[5][12].x, y: grid[5][12].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[4][12].x, y: grid[4][12].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[3][12].x, y: grid[3][12].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[2][12].x, y: grid[2][12].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[1][12].x, y: grid[1][12].y, corner: 'bottom-left' }); // Turn corner
    
    // Up one 6 
    tiles.push({ id: currentId++, x: grid[1][11].x, y: grid[1][11].y, corner: 'top-left' }); // Turn corner
    
    // Right 2 7, 8
    tiles.push({ id: currentId++, x: grid[2][11].x, y: grid[2][11].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[3][11].x, y: grid[3][11].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 2 9, 10
    tiles.push({ id: currentId++, x: grid[3][10].x, y: grid[3][10].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[3][9].x, y: grid[3][9].y, corner: 'top-right' }); // Turn corner
    
    // Left 1 11
    tiles.push({ id: currentId++, x: grid[2][9].x, y: grid[2][9].y, corner: 'top-left' }); // Turn corner
    
    // Down 1 12 
    tiles.push({ id: currentId++, x: grid[2][10].x, y: grid[2][10].y, corner: 'bottom-right' }); // Turn corner
    
    // Left 1 13
    tiles.push({ id: currentId++, x: grid[1][10].x, y: grid[1][10].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 2 14, 15
    tiles.push({ id: currentId++, x: grid[1][9].x, y: grid[1][9].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[1][8].x, y: grid[1][8].y, corner: 'top-left' }); // Turn corner
    
    // Right 2 16, 17
    tiles.push({ id: currentId++, x: grid[2][8].x, y: grid[2][8].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[3][8].x, y: grid[3][8].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 2 18, 19
    tiles.push({ id: currentId++, x: grid[3][7].x, y: grid[3][7].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[3][6].x, y: grid[3][6].y, corner: 'top-right' }); // Turn corner
    
    // Left 1 20
    tiles.push({ id: currentId++, x: grid[2][6].x, y: grid[2][6].y, corner: 'top-left' }); // Turn corner
    
    // Down 1 21
    tiles.push({ id: currentId++, x: grid[2][7].x, y: grid[2][7].y, corner: 'bottom-right' }); // Turn corner
    
    // Right 1 22
    tiles.push({ id: currentId++, x: grid[1][7].x, y: grid[1][7].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 3, 23, 24, 25
    tiles.push({ id: currentId++, x: grid[1][6].x, y: grid[1][6].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[1][5].x, y: grid[1][5].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[1][4].x, y: grid[1][4].y, corner: 'top-left' }); // Turn corner
    
    // Right 3, 26, 27, 28
    tiles.push({ id: currentId++, x: grid[2][4].x, y: grid[2][4].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[3][4].x, y: grid[3][4].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[4][4].x, y: grid[4][4].y, corner: 'bottom-right'});
    
    // Up 1 29
    tiles.push({ id: currentId++, x: grid[4][3].x, y: grid[4][3].y, corner: 'top-right' }); // Turn corner
    
    // Left 3; 30, 31, 32
    tiles.push({ id: currentId++, x: grid[3][3].x, y: grid[3][3].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[2][3].x, y: grid[1][3].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[1][3].x, y: grid[1][3].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 1 33
    tiles.push({ id: currentId++, x: grid[1][2].x, y: grid[1][2].y, corner: 'top-left' }); // Turn corner
    
    // Right 1 34
    tiles.push({ id: currentId++, x: grid[2][2].x, y: grid[2][2].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 1 35
    tiles.push({ id: currentId++, x: grid[2][1].x, y: grid[2][1].y, corner: 'top-left' }); // Turn corner
    
    // Right 1 36
    tiles.push({ id: currentId++, x: grid[3][1].x, y: grid[3][1].y, corner: 'top-right' }); // Turn corner
    
    // Down 1 37
    tiles.push({ id: currentId++, x: grid[3][2].x, y: grid[3][2].y, corner: 'bottom-left' }); // Turn corner
    
    // Right 1 38
    tiles.push({ id: currentId++, x: grid[4][2].x, y: grid[4][2].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 1, 39 
    tiles.push({ id: currentId++, x: grid[4][1].x, y: grid[4][1].y, corner: 'top-left' }); // Turn corner
    
    // Right 1 - to finish 40
    tiles.push({ id: currentId++, x: grid[5][1].x, y: grid[5][1].y, type: 'finish', corner: 'none' });
    
    return {
      type: 'bus',
      tiles: tiles,
      colors: PATH_COLORS.bus,
    };
  }
  
  function createCarpoolPath(grid) {
    const tiles = [];
    let currentId = 0;
    
    // Start at (6,12) - crossroads
    tiles.push({ id: currentId++, x: grid[6][12].x, y: grid[6][12].y, type: 'start', corner: 'none' });
    
    // Right 2: (7,12), (8,12)
    tiles.push({ id: currentId++, x: grid[7][12].x, y: grid[7][12].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[8][12].x, y: grid[8][12].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 2: (8,11), (8,10)
    tiles.push({ id: currentId++, x: grid[8][11].x, y: grid[8][11].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[8][10].x, y: grid[8][10].y, corner: 'top-left' }); // Turn corner
    
    // Right 2: (9,10), (10,10)
    tiles.push({ id: currentId++, x: grid[9][10].x, y: grid[9][10].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[10][10].x, y: grid[10][10].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 2: (10,9), (10,8)
    tiles.push({ id: currentId++, x: grid[10][9].x, y: grid[10][9].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[10][8].x, y: grid[10][8].y, corner: 'top-right' }); // Turn corner
    
    // Left 1: (9,8)
    tiles.push({ id: currentId++, x: grid[9][8].x, y: grid[9][8].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 1: (9,7)
    tiles.push({ id: currentId++, x: grid[9][7].x, y: grid[9][7].y, corner: 'top-right' }); // Turn corner
    
    // Left 1: (8,7)
    tiles.push({ id: currentId++, x: grid[8][7].x, y: grid[8][7].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 2: (8,6), (8,5)
    tiles.push({ id: currentId++, x: grid[8][6].x, y: grid[8][6].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[8][5].x, y: grid[8][5].y, corner: 'top-left' }); // Turn corner
    
    // Right 2: (9,5), (10,5)
    tiles.push({ id: currentId++, x: grid[9][5].x, y: grid[9][5].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[10][5].x, y: grid[10][5].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 2: (10,4), (10,3)
    tiles.push({ id: currentId++, x: grid[10][4].x, y: grid[10][4].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[10][3].x, y: grid[10][3].y, corner: 'top-right' }); // Turn corner
    
    // Left 3: (9,3), (8,3), (7,3)
    tiles.push({ id: currentId++, x: grid[9][3].x, y: grid[9][3].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[8][3].x, y: grid[8][3].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[7][3].x, y: grid[7][3].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 1: (7,2)
    tiles.push({ id: currentId++, x: grid[7][2].x, y: grid[7][2].y, corner: 'top-left' }); // Turn corner
    
    // Right 2: (8,2), (9,2)
    tiles.push({ id: currentId++, x: grid[8][2].x, y: grid[8][2].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[9][2].x, y: grid[9][2].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 1: (9,1)
    tiles.push({ id: currentId++, x: grid[9][1].x, y: grid[9][1].y, corner: 'top-right' }); // Turn corner
    
    // Left 4: (8,1), (7,1), (6,1), (5,1)
    tiles.push({ id: currentId++, x: grid[8][1].x, y: grid[8][1].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[7][1].x, y: grid[7][1].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[6][1].x, y: grid[6][1].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[5][1].x, y: grid[5][1].y, type: 'finish', corner: 'none' }); // Finish
    
    return {
      type: 'carpool',
      tiles: tiles,
      colors: PATH_COLORS.carpool,
    };
  }
  
  function createBicyclePath(grid) {
    const tiles = [];
    let currentId = 0;
    
    // Start at (6,12) - crossroads
    tiles.push({ id: currentId++, x: grid[6][12].x, y: grid[6][12].y, type: 'start', corner: 'none' });
    
    // Up 2: (6,11), (6,10)
    tiles.push({ id: currentId++, x: grid[6][11].x, y: grid[6][11].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[6][10].x, y: grid[6][10].y, corner: 'top-right' }); // Turn corner
    
    // Left 1: (5,10)
    tiles.push({ id: currentId++, x: grid[5][10].x, y: grid[5][10].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 2: (5,9), (5,8)
    tiles.push({ id: currentId++, x: grid[5][9].x, y: grid[5][9].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[5][8].x, y: grid[5][8].y, corner: 'top-left' }); // Turn corner
    
    // Right 1: (6,8)
    tiles.push({ id: currentId++, x: grid[6][8].x, y: grid[6][8].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 2: (6,7), (6,6)
    tiles.push({ id: currentId++, x: grid[6][7].x, y: grid[6][7].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[6][6].x, y: grid[6][6].y, corner: 'top-right' }); // Turn corner
    
    // Left 1: (5,6)
    tiles.push({ id: currentId++, x: grid[5][6].x, y: grid[5][6].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 1: (5,5)
    tiles.push({ id: currentId++, x: grid[5][5].x, y: grid[5][5].y, corner: 'top-left' }); // Turn corner
    
    // Right 1: (6,5)
    tiles.push({ id: currentId++, x: grid[6][5].x, y: grid[6][5].y, corner: 'bottom-right' }); // Turn corner
    
    // Up 2: (6,4), (6,3)
    tiles.push({ id: currentId++, x: grid[6][4].x, y: grid[6][4].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[6][3].x, y: grid[6][3].y, corner: 'top-right' }); // Turn corner
    
    // Left 1: (5,3)
    tiles.push({ id: currentId++, x: grid[5][3].x, y: grid[5][3].y, corner: 'bottom-left' }); // Turn corner
    
    // Up 2: (5,2), (5,1)
    tiles.push({ id: currentId++, x: grid[5][2].x, y: grid[5][2].y, corner: 'none' });
    tiles.push({ id: currentId++, x: grid[5][1].x, y: grid[5][1].y, type: 'finish', corner: 'none' }); // Finish
    
    return {
      type: 'bicycle',
      tiles: tiles,
      colors: PATH_COLORS.bicycle,
    };
  }
  
  // Function to get the active path based on transport mode
  const getActivePath = () => {
    switch(transportMode) {
      case 'bus': return busPath;
      case 'carpool': return carpoolPath;
      case 'bicycle': return bicyclePath;
      default: return busPath;
    }
  };
  
  // Render a single tile based on its properties
  const renderTile = (path, tile, index, isActive) => {
    // Choose color based on index to create color variation
    const colorIndex = index % path.colors.length;
    const bgColor = path.colors[colorIndex];
    const tileSizeMultiplier = path.type === transportMode ? 1.1 : 0.9;
    const adjustedTileSize = tileSize * tileSizeMultiplier;
    
    // Apply different styling based on corner type
    let borderRadius = {};
    
    // Get border radius based on corner type
    switch(tile.corner) {
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
      (tile.type === 'start' && (path.type === transportMode || (transportMode === null && path.type === 'bus'))) ||
      (tile.type === 'finish' && (path.type === transportMode || (transportMode === null && path.type === 'bus')));
    
    const opacity = path.type === transportMode ? 1 : 0.6;

    return (
      <View key={`tile-${path.type}-${tile.id}`}>
        {/* Tile square */}
        <View 
          style={[
            styles.tile, 
            { 
              width: adjustedTileSize, 
              height: adjustedTileSize,
              backgroundColor: bgColor,
              left: tile.x - adjustedTileSize/2,
              top: tile.y - adjustedTileSize/2,
              opacity,
              ...borderRadius
            },
            isActive && path.type === transportMode && styles.activeTile,
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
        {isActive && path.type === transportMode && (
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
  
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {/* Render all paths - bottom to top for proper layering */}
        {[bicyclePath, carpoolPath, busPath].map(path => 
          path.tiles.map((tile, index) => 
            renderTile(
              path, 
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