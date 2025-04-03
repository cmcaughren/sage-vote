// app/gameboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameContext } from '../context/GameContext';
import GameBoard from '../components/GameBoard';
import Card from '../components/Card';
import NotebookIcon from '../components/NotebookIcon';
import WinningPopup from '../components/WinningPopup';
import { getNotebookEntries, saveGameProgress } from '../utilities/asyncStorage';
import { styles } from '../styles/screens/GameBoard.styles';
import { COLORS } from '../styles/theme/colors';
import { getCards, testFirebaseConnection } from '../firebase/firebaseService';

// Fallback emergency card as a last resort
const FALLBACK_CARD = {
  id: "fallback-emergency",
  transport_type: "any",
  election_type: "federal",
  url: "https://www.elections.ca/",
  description: "We're experiencing database issues. Here's some information about Elections Canada that might be useful.",
  opt_actions: {
    "1": ["1", "Technical difficulties shouldn't stop democracy! Move forward 1 space."]
  }
};

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

  // New state for direct card loading
  const [directlyLoadedCards, setDirectlyLoadedCards] = useState(null);
  const [isDirectlyLoading, setIsDirectlyLoading] = useState(false);
  const [directLoadError, setDirectLoadError] = useState(null);

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
    console.log('Player is at crossroads, triggering reroll');

    // Navigate to crossroads screen
    router.push('/crossroads');

    // Set the flag AFTER navigation starts to prevent duplicate alerts
    // This ensures the alert has already been shown once
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

      console.log('Player landed on crossroads from position', prevPosition.current);

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

  // Function to test Firebase connection
  const testFirebase = async () => {
    try {
      const result = await testFirebaseConnection();
      Alert.alert(
        result.success ? "Connection Success" : "Connection Failed",
        result.success
          ? `Successfully connected to Firebase! Found ${result.count} cards.`
          : `Error: ${result.error}`
      );
    } catch (error) {
      Alert.alert("Test Failed", `Error: ${error.message}`);
    }
  };

  // Function to load cards directly from Firestore
  const loadCardsDirectly = async () => {
    if (isDirectlyLoading) return false;

    setIsDirectlyLoading(true);
    setDirectLoadError(null);

    try {
      console.log("Directly loading cards from Firestore...");

      // First test the connection
      const test = await testFirebaseConnection();
      if (!test.success) {
        throw new Error(`Firebase connection test failed: ${test.error}`);
      }

      // If connection works, get the cards
      const anyCards = await getCards('any');
      let specificCards = [];

      if (transportMode) {
        specificCards = await getCards(transportMode);
      }

      const loadedCards = {
        any: anyCards
      };

      if (transportMode) {
        loadedCards[transportMode] = specificCards;
      }

      setDirectlyLoadedCards(loadedCards);
      console.log(`Directly loaded ${anyCards.length} 'any' cards and ${specificCards.length} specific cards`);

      return true;
    } catch (error) {
      console.error("Error loading cards:", error);
      setDirectLoadError(error.message);
      return false;
    } finally {
      setIsDirectlyLoading(false);
    }
  };

  // Function to get a random card from directly loaded cards
  const getRandomDirectCard = () => {
    if (!directlyLoadedCards) return null;

    // Create a combined deck for the specific transportation type
    const specificCards = transportMode && directlyLoadedCards[transportMode] ?
      directlyLoadedCards[transportMode] : [];
    const anyCards = directlyLoadedCards.any || [];
    const combinedDeck = [...specificCards, ...anyCards];

    if (combinedDeck.length === 0) return null;

    // Select a random card
    const randomIndex = Math.floor(Math.random() * combinedDeck.length);
    return combinedDeck[randomIndex];
  };

  // Draw card function
  const drawCard = () => {
    // Check if cards are still loading
    if (isDrawing) return;

    setIsDrawing(true);

    // Use a small timeout to show the drawing indicator
    setTimeout(async () => {
      try {
        // Check if we have a valid transport mode
        if (!transportMode) {
          Alert.alert("Error", "No transportation mode selected!");
          setIsDrawing(false);
          return;
        }

        // STRATEGY 1: Try using the context drawRandomCard function
        let selectedCard = null;

        if (!cardsLoading && availableCards && allCards) {
          console.log("Attempting to draw card using GameContext...");
          selectedCard = drawRandomCard(transportMode);

          if (selectedCard) {
            console.log("Successfully drew card from GameContext");
          } else {
            console.log("GameContext drawRandomCard returned null");
          }
        } else {
          console.log("Skipping GameContext draw: cards are loading or unavailable");
        }

        // STRATEGY 2: If context failed, try directly loaded cards
        if (!selectedCard && directlyLoadedCards) {
          console.log("Falling back to directly loaded cards");
          selectedCard = getRandomDirectCard();

          if (selectedCard) {
            console.log("Successfully drew card from directly loaded cards");
          } else {
            console.log("Failed to get random direct card");
          }
        }

        // STRATEGY 3: If both failed, try loading directly now
        if (!selectedCard && !directlyLoadedCards && !isDirectlyLoading) {
          console.log("No cards available, attempting direct load now");
          const loadSuccess = await loadCardsDirectly();

          if (loadSuccess) {
            // Try one more time with newly loaded cards
            selectedCard = getRandomDirectCard();

            if (selectedCard) {
              console.log("Drew card after direct loading");
            } else {
              console.log("Still couldn't get a card after direct loading");
            }
          }
        }

        // FINAL FALLBACK: If all else fails, use emergency fallback card
        if (!selectedCard) {
          console.log("All card loading strategies failed, using fallback card");
          selectedCard = FALLBACK_CARD;
        }

        // Set the selected card
        setCurrentCard(selectedCard);
      } catch (error) {
        console.error("Error in drawCard:", error);
        Alert.alert("Error", "Something went wrong. Please try again later.");
        // Use fallback card in case of error
        setCurrentCard(FALLBACK_CARD);
      } finally {
        setIsDrawing(false);
      }
    }, 500);
  };

  // Handle retry when card loading fails
  const handleRetryCardLoading = async () => {
    Alert.alert(
      "Reload Cards",
      "Would you like to try reloading cards directly from the database?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reload",
          onPress: async () => {
            // Run the test first
            const testResult = await testFirebaseConnection();
            if (!testResult.success) {
              Alert.alert(
                "Connection Failed",
                `Firebase connection test failed: ${testResult.error}`
              );
              return;
            }

            const success = await loadCardsDirectly();
            if (success) {
              Alert.alert(
                "Success",
                "Cards reloaded successfully. Try drawing a card now."
              );
            } else {
              Alert.alert(
                "Failed",
                `Could not reload cards: ${directLoadError || "Unknown error"}`
              );
            }
          }
        }
      ]
    );
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

  // Get direct card counts
  const getDirectCardCount = () => {
    if (!directlyLoadedCards) return 0;

    const specificCards = transportMode && directlyLoadedCards[transportMode] ?
      directlyLoadedCards[transportMode].length : 0;
    const anyCards = directlyLoadedCards.any ? directlyLoadedCards.any.length : 0;

    return specificCards + anyCards;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journey to the Polling Station</Text>

        {/* Transport mode is always shown in both dev and production mode */}
        <Text style={styles.subtitle}>
          {getTransportLabel()}
          {/* Only show position in dev mode */}
          {devMode && ` | Position: ${boardPosition}`}
        </Text>

        {/* Card information with more details in dev mode */}
        {devMode && (
          cardsLoading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="small" color={COLORS.secondary} />
              <Text style={[styles.cardInfo, { marginLeft: 8 }]}>
                Loading cards...
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.cardInfo}>
                Context Cards: {getAvailableCardCount()} available / {getTotalCardCount()} total
              </Text>
              {directlyLoadedCards && (
                <Text style={[styles.cardInfo, { color: COLORS.success }]}>
                  Direct Cards: {getDirectCardCount()} loaded
                </Text>
              )}
            </View>
          )
        )}
      </View>

      {/* Notebook Icon in top-right corner */}
      <View style={styles.notebookIconContainer}>
        <NotebookIcon onPress={handleOpenNotebook} count={notebookCount} />
      </View>

      <View style={styles.boardContainer}>
        <GameBoard />
      </View>

      {/* Conditional rendering of controls based on dev mode */}
      {!devMode ? (
        // Production mode: centered, consistent button
        <View style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
          <TouchableOpacity
            style={[
              styles.primaryActionButton,
              (cardsLoading || isDrawing) && { opacity: 0.7 }
            ]}
            onPress={drawCard}
            disabled={cardsLoading || isDrawing}
          >
            <Text style={styles.primaryActionButtonText}>
              {isDrawing ? "Drawing..." :
                isDirectlyLoading ? "Loading Cards..." :
                  cardsLoading ? "Loading Cards..." : "Draw Card"}
            </Text>
          </TouchableOpacity>

          {/* Only show retry button if there was a direct load error */}
          {directLoadError && (
            <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: COLORS.warning,
                borderRadius: 5
              }}
              onPress={handleRetryCardLoading}
            >
              <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}>
                Try Reloading Cards
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        // Dev mode: original controls layout with additional debugging options
        <View>
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={movePlayerBackward}
            >
              <Text style={styles.buttonText}>Move Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.cardButton,
                (cardsLoading || isDrawing) && { opacity: 0.7 }
              ]}
              onPress={drawCard}
              disabled={cardsLoading || isDrawing}
            >
              <Text style={styles.buttonText}>
                {isDrawing ? "Drawing..." :
                  isDirectlyLoading ? "Loading Direct..." :
                    cardsLoading ? "Loading Cards..." : "Draw Card"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.forwardButton]}
              onPress={movePlayerForward}
            >
              <Text style={styles.buttonText}>Move Forward</Text>
            </TouchableOpacity>
          </View>

          {/* Dev mode debugging buttons */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
            paddingHorizontal: 15
          }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#ff9500', padding: 10 }]}
              onPress={loadCardsDirectly}
            >
              <Text style={styles.buttonText}>Load Direct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#34c759', padding: 10 }]}
              onPress={testFirebase}
            >
              <Text style={styles.buttonText}>Test Firebase</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#5856d6', padding: 10 }]}
              onPress={() => setCurrentCard(FALLBACK_CARD)}
            >
              <Text style={styles.buttonText}>Test Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {devMode && (
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      )}

      {/* Card modal */}
      {currentCard && (
        <Card
          card={currentCard}
          onClose={() => setCurrentCard(null)}
          onAction={handleCardAction}
          devMode={devMode}
        />
      )}

      {/* Winning popup with integrated confetti */}
      <WinningPopup
        visible={showWinningPopup}
        onRequestClose={() => setShowWinningPopup(false)}
      />
    </SafeAreaView>
  );
};

export default GameBoardScreen;