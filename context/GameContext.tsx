// context/GameContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { DEV_MODE } from '../config/development';

// Define the shape of your context
interface GameContextType {
  transportMode: string | null;
  setTransportMode: (mode: string) => void;
  boardPosition: number;
  setBoardPosition: (position: number) => void;
  diceRoll: number | null;
  setDiceRoll: (roll: number) => void;
  pathLengths: {
    bus: number;
    carpool: number;
    bicycle: number;
  };
  setPathLengths: (lengths: { bus: number; carpool: number; bicycle: number }) => void;
  drawnCards: Record<string, string[]>; // Maps transport mode to array of drawn card IDs
  resetDeck: () => void; // Function to reset the deck when all cards are drawn
  markCardAsDrawn: (transportMode: string, cardId: string) => void; // Mark a card as drawn
  devMode: boolean; // Flag for development mode
}

// Create the context with a default value
const GameContext = createContext<GameContextType>({
  transportMode: null,
  setTransportMode: () => {},
  boardPosition: 0,
  setBoardPosition: () => {},
  diceRoll: null,
  setDiceRoll: () => {},
  pathLengths: { bus: 0, carpool: 0, bicycle: 0 },
  setPathLengths: () => {},
  drawnCards: { any: [], bus: [], carpool: [], bicycle: [] },
  resetDeck: () => {},
  markCardAsDrawn: () => {},
  devMode: DEV_MODE,
});

// Create a provider component
export const GameProvider = ({ children }) => {
  const [transportMode, setTransportMode] = useState<string | null>(null);
  const [boardPosition, setBoardPosition] = useState<number>(0);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [pathLengths, setPathLengths] = useState({ bus: 0, carpool: 0, bicycle: 0 });
  const [drawnCards, setDrawnCards] = useState<Record<string, string[]>>({
    any: [],
    bus: [],
    carpool: [],
    bicycle: []
  });

  // Function to mark a card as drawn
  const markCardAsDrawn = (transportMode: string, cardId: string) => {
    setDrawnCards(prev => ({
      ...prev,
      [transportMode]: [...prev[transportMode], cardId]
    }));
  };

  // Function to reset the deck
  const resetDeck = () => {
    setDrawnCards({
      any: [],
      bus: [],
      carpool: [],
      bicycle: []
    });
  };

  return (
    <GameContext.Provider
      value={{
        transportMode,
        setTransportMode,
        boardPosition,
        setBoardPosition,
        diceRoll,
        setDiceRoll,
        pathLengths,
        setPathLengths,
        drawnCards,
        resetDeck,
        markCardAsDrawn,
        devMode: DEV_MODE,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Create a hook for using the context
export const useGameContext = () => useContext(GameContext);