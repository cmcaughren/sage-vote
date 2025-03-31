// context/GameContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEV_MODE } from '../config/development';
import { generatePathData } from '../utilities/pathCalculations';
import { Image } from 'expo-image';
import { getCards } from '../firebase/firebaseService';
import { loadGameProgress, saveGameProgress } from '../utilities/asyncStorage';

// Pre-load logo image
try {
  Image.prefetch(require('../assets/images/logo.png'));
  console.log('Logo image prefetched at module level');
} catch (e) {
  console.log('Failed to prefetch logo image:', e);
}

// Calculate path data once when this module loads
const preCalculatedData = generatePathData();
console.log('Pre-calculated path data at module level:', preCalculatedData.pathLengths);

// Define the shape of your context
interface GameContextType {
  transportMode: string | null;
  setTransportMode: (mode: string) => void;
  boardPosition: number;
  setBoardPosition: (position: number) => void;
  diceRoll: number | null;
  setDiceRoll: (roll: number) => void;

  // Path data (pre-calculated)
  pathData: any;
  pathLengths: any;
  tileSize: number;

  // Card tracking
  drawnCards: Record<string, string[]>;
  resetDeck: () => void;
  markCardAsDrawn: (transportMode: string, cardId: string) => void;

  // Cards state
  allCards: Record<string, any[]>;
  availableCards: Record<string, any[]>;
  cardsLoading: boolean;

  // Card drawing function
  drawRandomCard: (transportType: string) => any;

  // Development mode
  devMode: boolean;
}

// Create the context with default values from pre-calculated data
const GameContext = createContext<GameContextType>({
  transportMode: null,
  setTransportMode: () => { },
  boardPosition: 0,
  setBoardPosition: () => { },
  diceRoll: null,
  setDiceRoll: () => { },

  pathData: preCalculatedData.pathData,
  pathLengths: preCalculatedData.pathLengths,
  tileSize: preCalculatedData.tileSize,

  drawnCards: { any: [], bus: [], carpool: [], bicycle: [] },
  resetDeck: () => { },
  markCardAsDrawn: () => { },

  allCards: { any: [], bus: [], carpool: [], bicycle: [] },
  availableCards: { any: [], bus: [], carpool: [], bicycle: [] },
  cardsLoading: true,

  drawRandomCard: () => null,

  devMode: DEV_MODE,
});

// Create a provider component
export const GameProvider = ({ children }) => {
  const [transportMode, setTransportMode] = useState<string | null>(null);
  const [boardPosition, setBoardPosition] = useState<number>(0);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [drawnCards, setDrawnCards] = useState<Record<string, string[]>>({
    any: [],
    bus: [],
    carpool: [],
    bicycle: []
  });

  // Add new state for preloaded cards
  const [allCards, setAllCards] = useState<Record<string, any[]>>({
    any: [],
    bus: [],
    carpool: [],
    bicycle: []
  });

  const [availableCards, setAvailableCards] = useState<Record<string, any[]>>({
    any: [],
    bus: [],
    carpool: [],
    bicycle: []
  });

  const [cardsLoading, setCardsLoading] = useState<boolean>(true);

  // Load saved game state
  useEffect(() => {
    const loadSavedGame = async () => {
      try {
        const savedGame = await loadGameProgress();
        if (savedGame) {
          // Restore saved state
          if (savedGame.transportMode) {
            setTransportMode(savedGame.transportMode);
          }

          if (typeof savedGame.boardPosition === 'number') {
            setBoardPosition(savedGame.boardPosition);
          }

          if (savedGame.drawnCards) {
            setDrawnCards(savedGame.drawnCards);
          }

          console.log('Loaded saved game state:', savedGame);
        }
      } catch (error) {
        console.error('Error loading saved game:', error);
      }
    };

    loadSavedGame();
  }, []);

  // Save game state when important things change
  useEffect(() => {
    const saveGameState = async () => {
      try {
        const gameState = {
          transportMode,
          boardPosition,
          drawnCards
        };

        await saveGameProgress(gameState);
      } catch (error) {
        console.error('Error saving game state:', error);
      }
    };

    // Only save if we have a transport mode set (game has started)
    if (transportMode) {
      saveGameState();
    }
  }, [transportMode, boardPosition, drawnCards]);

  // Function to mark a card as drawn
  const markCardAsDrawn = (transportMode: string, cardId: string) => {
    setDrawnCards(prev => ({
      ...prev,
      [transportMode]: [...prev[transportMode], cardId]
    }));

    // Also update available cards
    updateAvailableCards();
  };

  // Function to reset the deck
  const resetDeck = () => {
    setDrawnCards({
      any: [],
      bus: [],
      carpool: [],
      bicycle: []
    });

    // Update available cards after reset
    updateAvailableCards();
  };

  // Function to load all cards when the app starts
  useEffect(() => {
    const preloadAllCards = async () => {
      setCardsLoading(true);

      try {
        // Load cards for each transportation type
        const busCards = await getCards('bus');
        const carpoolCards = await getCards('carpool');
        const bicycleCards = await getCards('bicycle');
        const anyCards = await getCards('any');

        // Update all cards state
        setAllCards({
          bus: busCards.filter(card => card.transport_type === 'bus'),
          carpool: carpoolCards.filter(card => card.transport_type === 'carpool'),
          bicycle: bicycleCards.filter(card => card.transport_type === 'bicycle'),
          any: anyCards.filter(card => card.transport_type === 'any')
        });

        console.log('All cards preloaded successfully');
      } catch (error) {
        console.error('Error preloading cards:', error);
      } finally {
        setCardsLoading(false);
      }
    };

    preloadAllCards();
  }, []);

  // Function to update available cards based on drawn cards
  const updateAvailableCards = () => {
    setAvailableCards(prevAvailable => {
      const newAvailable = { ...prevAvailable };

      // Update for each transportation type
      Object.keys(allCards).forEach(type => {
        newAvailable[type] = allCards[type].filter(
          card => !drawnCards[card.transport_type].includes(card.id)
        );
      });

      return newAvailable;
    });
  };

  // Update available cards whenever all cards or drawn cards change
  useEffect(() => {
    updateAvailableCards();
  }, [allCards, drawnCards]);

  // Function to draw a random card
  const drawRandomCard = (transportType: string) => {
    // Create a combined deck for the specific transportation type
    let specificCards = availableCards[transportType] || [];
    let anyCards = availableCards['any'] || [];
    let combinedDeck = [...specificCards, ...anyCards];

    // If no cards available, silently reset the deck and try again
    if (combinedDeck.length === 0) {
      console.log("No available cards for this transport type, silently resetting deck");
      resetDeck();

      // Create a new combined deck from all cards (now that we've reset)
      specificCards = allCards[transportType] || [];
      anyCards = allCards['any'] || [];
      combinedDeck = [...specificCards, ...anyCards];

      // Still no cards? Something is wrong with the data
      if (combinedDeck.length === 0) {
        console.error("No cards available even after reset!");
        return null;
      }
    }

    // Select a random card from the available or newly reset deck
    const randomIndex = Math.floor(Math.random() * combinedDeck.length);
    const selectedCard = combinedDeck[randomIndex];

    if (selectedCard) {
      // Mark as drawn
      markCardAsDrawn(selectedCard.transport_type, selectedCard.id);
    }

    return selectedCard;
  };

  // Add this effect to ensure position is valid for current transport mode
  useEffect(() => {
    // Only run this check when we have a valid transport mode
    if (transportMode) {
      // Get maximum position for the current transport path
      const maxPosition = preCalculatedData.pathLengths[transportMode];

      // If current position exceeds the path length, reset to 0
      if (boardPosition > maxPosition) {
        console.log(`Position ${boardPosition} exceeds max ${maxPosition} for ${transportMode}, resetting to 0`);
        setBoardPosition(0);
      }
    }
  }, [transportMode, boardPosition]);

  return (
    <GameContext.Provider
      value={{
        transportMode,
        setTransportMode,
        boardPosition,
        setBoardPosition,
        diceRoll,
        setDiceRoll,

        // Use pre-calculated data
        pathData: preCalculatedData.pathData,
        pathLengths: preCalculatedData.pathLengths,
        tileSize: preCalculatedData.tileSize,

        drawnCards,
        resetDeck,
        markCardAsDrawn,

        // Add new card state properties
        allCards,
        availableCards,
        cardsLoading,

        // Add card drawing function
        drawRandomCard,

        devMode: DEV_MODE,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Create a hook for using the context
export const useGameContext = () => useContext(GameContext);