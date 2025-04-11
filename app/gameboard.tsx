// app/gameboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameContext } from '../context/GameContext';
import GameBoard from '../components/GameBoard';
import Card from '../components/Card';
import NotebookIcon from '../components/NotebookIcon';
import { getNotebookEntries, saveGameProgress } from '../utilities/asyncStorage';
import { styles } from '../styles/screens/GameBoard.styles';
import { StatusBar } from 'expo-status-bar'; // Use Expo's StatusBar for better iOS compatibility
import DevControls from '../components/DevControls';

const GameBoardScreen = () => {
  const {
    transportMode,
    boardPosition,
    setBoardPosition,
    pathLengths,
    cardsLoading,
    availableCards,
    allCards,
    drawRandomCard,
    devMode,
    drawnCards
  } = useGameContext();

  const [currentCard, setCurrentCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [notebookCount, setNotebookCount] = useState(0);
  const [showWinningPopup, setShowWinningPopup] = useState(false);

  // Track first render to prevent showing crossroads alert on initial load
  const isFirstRender = useRef(true);
  // Track previous position to detect landing on crossroads
  const prevPosition = useRef(0);
  // Flag to prevent multiple alerts during navigation
  const [isNavigatingToCrossroads, setIsNavigatingToCrossroads] = useState(false);

  const router = useRouter();

  // Load notebook count when component mounts
  useEffect(() => {
    loadNotebookCount();

    // Reset navigation flag when component mounts
    setIsNavigatingToCrossroads(false);
  }, []);

  // Save game progress whenever important state changes
  useEffect(() => {
    const saveProgress = async () => {
      try {
        const gameState = {
          transportMode,
          boardPosition,
          drawnCards
        };
        await saveGameProgress(gameState);
      } catch (error) {
        console.error('Error saving game progress:', error);
      }
    };

    saveProgress();
  }, [transportMode, boardPosition, drawnCards]);

  // Check for victory condition whenever board position changes
  useEffect(() => {
    if (transportMode && boardPosition === pathLengths[transportMode]) {
      // Player has reached the finish - show winning popup
      setShowWinningPopup(true);
    }
  }, [boardPosition, transportMode, pathLengths]);

  // Function to handle crossroads reroll with delayed flag setting
  const handleCrossroadsReroll = () => {
    // Navigate to crossroads screen
    router.push('/crossroads');

    // Set the flag AFTER navigation starts to prevent duplicate alerts
    setTimeout(() => {
      setIsNavigatingToCrossroads(true);
    }, 100);
  };

  // Add effect to detect when player lands on position 0 (crossroads)
  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPosition.current = boardPosition;
      return;
    }

    // Only show alert if:
    // 1. Current position is 0 (at crossroads)
    // 2. Previous position was not 0 (they just landed here)
    // 3. They have a transportation mode (already started the game)
    // 4. Not already navigating to crossroads
    if (boardPosition === 0 &&
      prevPosition.current !== 0 &&
      transportMode &&
      !isNavigatingToCrossroads) {

      // Show alert without a "No" option
      Alert.alert(
        'Crossroads',
        'You\'ve reached the crossroads! Roll again for a new transportation mode!',
        [
          {
            text: 'Roll Again',
            onPress: handleCrossroadsReroll
          }
        ],
        { cancelable: false } // Prevent dismissing by tapping outside
      );
    }

    // Update previous position for next comparison
    prevPosition.current = boardPosition;
  }, [boardPosition, transportMode, isNavigatingToCrossroads]);

  // Load the number of notebook entries for the badge
  const loadNotebookCount = async () => {
    const entries = await getNotebookEntries();
    setNotebookCount(entries.length);
  };

  // Handle opening the notebook
  const handleOpenNotebook = () => {
    router.push('/notebook');
  };

  // Function to draw a card
  const drawCard = () => {
    // Check if cards are still loading
    if (cardsLoading) {
      Alert.alert("Please Wait", "Cards are still loading. Please try again in a moment.");
      return;
    }

    // Prevent multiple draws
    if (isDrawing) return;

    setIsDrawing(true);

    // Use a small timeout to show the drawing indicator
    setTimeout(() => {
      // Check if we have a valid transport mode
      if (!transportMode) {
        Alert.alert("Error", "No transportation mode selected!");
        setIsDrawing(false);
        return;
      }

      // Draw a random card for this transport mode
      const selectedCard = drawRandomCard(transportMode);

      if (selectedCard) {
        setCurrentCard(selectedCard);
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }

      setIsDrawing(false);
    }, 500);
  };

  // Handle card action
  const handleCardAction = (action) => {
    if (action === "crossroads") {
      // Return to crossroads (position 0)
      setBoardPosition(0);
      // Let the position effect handle showing the alert
    } else if (action === "nothing") {
      // Do nothing, just close the card
      setCurrentCard(null);
    } else {
      // Convert action to number if it's a number string
      const moveSteps = parseInt(action);

      if (!isNaN(moveSteps)) {
        // Calculate new position
        const newPosition = boardPosition + moveSteps;
        const maxPosition = pathLengths[transportMode];

        // Ensure new position is within bounds
        if (newPosition < 0) {
          // For negative movement, set position to 0
          // This will trigger the useEffect that shows the alert once
          setBoardPosition(0);
        } else if (newPosition >= maxPosition) {
          // Reached or exceeded the end
          setBoardPosition(maxPosition);
          // Show winning popup
          setShowWinningPopup(true);
        } else {
          setBoardPosition(newPosition);
        }
      }

      setCurrentCard(null);
    }

    // Refresh notebook count after card is closed
    loadNotebookCount();
  };

  // Test function to move player forward (dev mode)
  const movePlayerForward = () => {
    // Get maximum position from context
    const maxPosition = transportMode ? pathLengths[transportMode] : 0;

    if (boardPosition < maxPosition) {
      setBoardPosition(boardPosition + 1);

      // Check if we've reached the finish
      if (boardPosition + 1 >= maxPosition) {
        // Show winning popup (which contains the confetti)
        setShowWinningPopup(true);
      }
    }
    else {
      // Already at finish - show winning popup
      setShowWinningPopup(true);
    }
  };

  // Test function to move player backward (dev mode)
  const movePlayerBackward = () => {
    if (boardPosition > 0) {
      setBoardPosition(boardPosition - 1);
    } else {
      // Let normal alert system handle this
      setBoardPosition(0);
    }
  };

  // Display active transport type and position
  const getTransportLabel = () => {
    switch (transportMode) {
      case 'bus': return 'Public Transit 🚌';
      case 'carpool': return 'Car Pool 🚗';
      case 'bicycle': return 'Bicycle 🚲';
      default: return 'None selected';
    }
  };

  // Get available card count for the current transport mode
  const getAvailableCardCount = () => {
    if (!transportMode) return 0;

    const specificCards = availableCards[transportMode]?.length || 0;
    const anyCards = availableCards['any']?.length || 0;
    return specificCards + anyCards;
  };

  // Get total card count for the current transport mode
  const getTotalCardCount = () => {
    if (!transportMode) return 0;

    const specificCards = allCards[transportMode]?.length || 0;
    const anyCards = allCards['any']?.length || 0;
    return specificCards + anyCards;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Regular UI elements */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Journey to the Polls</Text>
        <Text style={styles.subtitle}>
          Draw a card, roll the dice, do your civic duty! 🍁
        </Text>

        <View style={styles.notebookIconContainer}>
          <NotebookIcon onPress={handleOpenNotebook} count={notebookCount} />
        </View>
      </View>

      <View style={styles.boardContainer}>
        <GameBoard />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.drawCardButton}
          onPress={drawCard}
          disabled={cardsLoading || isDrawing}
        >
          <Text style={styles.buttonText}>
            {isDrawing ? "Drawing..." : "Draw Card"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Developer controls as a separate component 
      {devMode && (
        <DevControls
          movePlayerForward={movePlayerForward}
          movePlayerBackward={movePlayerBackward}
          boardPosition={boardPosition}
          transportMode={transportMode}
          availableCardCount={getAvailableCardCount()}
          totalCardCount={getTotalCardCount()}
          cardsLoading={cardsLoading}
          goHome={() => router.push('/')}
        />
      )}*/}
    </SafeAreaView>
  );
};

export default GameBoardScreen;