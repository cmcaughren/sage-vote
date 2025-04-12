// app/gameboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameContext } from '../context/GameContext';
import GameBoard from '../components/GameBoard';
import Card from '../components/Card';
import NotebookIcon from '../components/NotebookIcon';
import WinningPopup from '../components/WinningPopup';
import { getNotebookEntries, saveGameProgress } from '../utilities/asyncStorage';
import { styles } from '../styles/screens/GameBoard.styles';
import { StatusBar } from 'expo-status-bar';

const GameBoardScreen = () => {
  const {
    transportMode,
    boardPosition,
    setBoardPosition,
    pathLengths,
    cardsLoading,
    drawRandomCard,
    devMode,
    drawnCards
  } = useGameContext();

  const [currentCard, setCurrentCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [notebookCount, setNotebookCount] = useState(0);
  const [showWinningPopup, setShowWinningPopup] = useState(false);
  const [isNavigatingToCrossroads, setIsNavigatingToCrossroads] = useState(false);

  const isFirstRender = useRef(true);
  const prevPosition = useRef(0);
  const router = useRouter();

  // Load notebook count on mount
  useEffect(() => {
    loadNotebookCount();
    setIsNavigatingToCrossroads(false);
  }, []);

  // Save game progress when important state changes
  useEffect(() => {
    const saveProgress = async () => {
      try {
        await saveGameProgress({
          transportMode,
          boardPosition,
          drawnCards
        });
      } catch (error) {
        console.error('Error saving game progress:', error);
      }
    };

    saveProgress();
  }, [transportMode, boardPosition, drawnCards]);

  // Check for victory
  useEffect(() => {
    if (transportMode && boardPosition === pathLengths[transportMode]) {
      setShowWinningPopup(true);
    }
  }, [boardPosition, transportMode, pathLengths]);

  // Handle crossroads detection
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPosition.current = boardPosition;
      return;
    }

    if (boardPosition === 0 &&
      prevPosition.current !== 0 &&
      transportMode &&
      !isNavigatingToCrossroads) {
      Alert.alert(
        'Crossroads',
        'You\'ve reached the crossroads! Roll again for a new transportation mode!',
        [{ text: 'Roll Again', onPress: handleCrossroadsReroll }],
        { cancelable: false }
      );
    }

    prevPosition.current = boardPosition;
  }, [boardPosition, transportMode, isNavigatingToCrossroads]);

  const loadNotebookCount = async () => {
    const entries = await getNotebookEntries();
    setNotebookCount(entries.length);
  };

  const handleOpenNotebook = () => {
    router.push('/notebook');
  };

  const handleCrossroadsReroll = () => {
    router.push('/crossroads');
    setTimeout(() => setIsNavigatingToCrossroads(true), 100);
  };

  const drawCard = () => {
    if (cardsLoading) {
      Alert.alert("Please Wait", "Cards are still loading. Please try again in a moment.");
      return;
    }

    if (isDrawing) return;

    setIsDrawing(true);

    setTimeout(() => {
      if (!transportMode) {
        Alert.alert("Error", "No transportation mode selected!");
        setIsDrawing(false);
        return;
      }

      const selectedCard = drawRandomCard(transportMode);

      if (selectedCard) {
        setCurrentCard(selectedCard);
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }

      setIsDrawing(false);
    }, 500);
  };

  const handleCardAction = (action) => {
    if (action === "crossroads") {
      setBoardPosition(0);
    } else if (action === "nothing") {
      setCurrentCard(null);
    } else {
      const moveSteps = parseInt(action);

      if (!isNaN(moveSteps)) {
        const newPosition = boardPosition + moveSteps;
        const maxPosition = pathLengths[transportMode];

        if (newPosition < 0) {
          setBoardPosition(0);
        } else if (newPosition >= maxPosition) {
          setBoardPosition(maxPosition);
          setShowWinningPopup(true);
        } else {
          setBoardPosition(newPosition);
        }
      }

      setCurrentCard(null);
    }

    loadNotebookCount();
  };

  const getTransportLabel = () => {
    switch (transportMode) {
      case 'bus': return 'Public Transit 🚌';
      case 'carpool': return 'Car Pool 🚗';
      case 'bicycle': return 'Bicycle 🚲';
      default: return 'None selected';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Journey to the Polls</Text>
        <Text style={styles.subtitle}>
          Draw a card, roll the dice, do your civic duty! 🍁
        </Text>

        <View style={styles.notebookIconContainer}>
          <NotebookIcon onPress={handleOpenNotebook} count={notebookCount} />
        </View>
      </View>

      {/* Game Board Container - Full width to allow proper centering */}
      <View style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <GameBoard />
      </View>

      {/* Button Container */}
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

      {/* Card Modal */}
      {currentCard && (
        <Card
          card={currentCard}
          onClose={() => setCurrentCard(null)}
          onAction={handleCardAction}
          devMode={devMode}
        />
      )}

      {/* Winning Popup */}
      <WinningPopup
        visible={showWinningPopup}
        onRequestClose={() => setShowWinningPopup(false)}
      />
    </SafeAreaView>
  );
};

export default GameBoardScreen;