// utilities/resetGame.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// This function completely resets the game state
export async function resetGameState() {
   try {
      console.log('Starting game state reset...');

      // Create a fresh game state with default values
      const freshGameState = {
         transportMode: null,
         boardPosition: 0,
         drawnCards: {
            any: [],
            bus: [],
            carpool: [],
            bicycle: []
         },
         // Add a timestamp to ensure the state is recognized as new
         resetTimestamp: new Date().toISOString()
      };

      // Completely remove the old game progress first to ensure clean state
      await AsyncStorage.removeItem('gameProgress');

      // Add a small delay to ensure the removal completes
      await new Promise(resolve => setTimeout(resolve, 100));

      // Now save the fresh state
      await AsyncStorage.setItem('gameProgress', JSON.stringify(freshGameState));

      console.log('Game state successfully reset with timestamp:', freshGameState.resetTimestamp);
      return true;
   } catch (error) {
      console.error('Error resetting game state:', error);
      return false;
   }
}

export default resetGameState;