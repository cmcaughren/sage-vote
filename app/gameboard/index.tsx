// app/gameboard/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameContext } from '../../context/GameContext';
import GameBoard from '../../components/game/GameBoard';
import Card from '../../components/ui/Card';
import NotebookIcon from '../../components/ui/NotebookIcon';
import { getCards } from '../../firebase/firebaseService';
import { getNotebookEntries } from '../../utilities/asyncStorage';

const GameBoardScreen = () => {
  const { 
    transportMode, 
    boardPosition, 
    setBoardPosition, 
    pathLengths,
    drawnCards,
    markCardAsDrawn,
    resetDeck,
    devMode
  } = useGameContext();
  
  const [allCards, setAllCards] = useState([]); // All cards from Firebase
  const [availableCards, setAvailableCards] = useState([]); // Cards not yet drawn
  const [currentCard, setCurrentCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notebookCount, setNotebookCount] = useState(0);
  const router = useRouter();
  
  // Fetch all cards when component mounts or transport mode changes
  useEffect(() => {
    const loadCards = async () => {
      if (transportMode) {
        // Load all cards for this transport mode
        const fetchedCards = await getCards(transportMode);
        setAllCards(fetchedCards);
        
        // Filter out cards that have already been drawn
        const availableForDrawing = fetchedCards.filter(card => {
          // Skip card if it's been drawn for its specific transport mode
          if (card.transport_type !== 'any' && 
              drawnCards[card.transport_type].includes(card.id)) {
            return false;
          }
          
          // Skip card if it's an 'any' card that's been drawn
          if (card.transport_type === 'any' && 
              drawnCards['any'].includes(card.id)) {
            return false;
          }
          
          return true;
        });
        
        setAvailableCards(availableForDrawing);
      }
    };
    
    loadCards();
    loadNotebookCount();
  }, [transportMode, drawnCards]);
  
  // Load the number of notebook entries for the badge
  const loadNotebookCount = async () => {
    const entries = await getNotebookEntries();
    setNotebookCount(entries.length);
  };
  
  // Handle opening the notebook
  const handleOpenNotebook = () => {
    router.push('/notebook');
  };
  
  // Function to draw a card without replacement
  const drawCard = () => {
    if (availableCards.length === 0) {
      // Check if we've drawn all cards
      if (allCards.length > 0 && availableCards.length === 0) {
        Alert.alert(
          "Deck Empty",
          "You've seen all available cards! Would you like to reshuffle the deck?",
          [
            {
              text: "No",
              style: "cancel"
            },
            {
              text: "Yes, Reshuffle",
              onPress: () => resetDeck()
            }
          ]
        );
        return; // Will trigger useEffect to reload available cards
      } else {
        Alert.alert("No Cards", "No cards available for this transportation mode!");
        return;
      }
    }
    
    setIsLoading(true);
    
    // Select a random card from available cards
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
    
    // Mark this card as drawn
    markCardAsDrawn(selectedCard.transport_type, selectedCard.id);
    
    // Update current card
    setTimeout(() => {
      setCurrentCard(selectedCard);
      setIsLoading(false);
    }, 500);
  };
  
  // Handle card action
  const handleCardAction = (action) => {
    if (action === "crossroads") {
      // Return to crossroads
      setBoardPosition(0);
      router.push('/crossroads');
    } else if (action === "nothing") {
      // Do nothing, just close the card
      setCurrentCard(null);
    } else {
      // Convert action to number if it's a number string
      const moveSteps = parseInt(action);
      
      if (!isNaN(moveSteps)) {
        // Calculate new position
        const newPosition = boardPosition + moveSteps;
        
        // Ensure new position is within bounds
        if (newPosition < 0) {
          setBoardPosition(0);
        } else if (newPosition > pathLengths[transportMode]) {
          // Reached the end
          setBoardPosition(pathLengths[transportMode]);
          Alert.alert('Congratulations!', 'You reached the polling station!');
        } else {
          setBoardPosition(newPosition);
        }
      }
      
      setCurrentCard(null);
    }
    
    // Refresh notebook count after card is closed
    // (in case they added a link to notebook)
    loadNotebookCount();
  };

  // Test function to move player forward
  const movePlayerForward = () => {
    // Get maximum position from context
    const maxPosition = transportMode ? pathLengths[transportMode] : 0;
    
    if (boardPosition < (maxPosition - 1)) {
      setBoardPosition(boardPosition + 1);
    }
    else if (boardPosition < maxPosition){
      setBoardPosition(boardPosition + 1);
      Alert.alert('Congratulations!', 'You reached the polling station!');
    }
    else {
      Alert.alert('Congratulations!', 'You reached the polling station!');
    }
  };
  
  // Test function to move player backward
  const movePlayerBackward = () => {
    if (boardPosition > 0) {
      setBoardPosition(boardPosition - 1);
    } else {
      // Player is back at start - offer to reroll
      Alert.alert('Crossroads', 'You\'re back at the crossroads! You should reroll for a new transport mode.');
      router.push('/crossroads');
    }
  };

  // Display active transport type and position
  const getTransportLabel = () => {
    switch(transportMode) {
      case 'bus': return 'Public Transit 🚌';
      case 'carpool': return 'Car Pool 🚗';
      case 'bicycle': return 'Bicycle 🚲';
      default: return 'None selected';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journey to the Polling Station</Text>
        <Text style={styles.subtitle}>
          {getTransportLabel()} | Position: {boardPosition}
        </Text>
        <Text style={styles.cardInfo}>
          Cards: {availableCards.length} available / {allCards.length} total
        </Text>
      </View>
      
      {/* Notebook Icon in top-right corner */}
      <View style={styles.notebookIconContainer}>
        <NotebookIcon onPress={handleOpenNotebook} count={notebookCount} />
      </View>
      
      <View style={styles.boardContainer}>
        <GameBoard />
      </View>
      
      <View style={styles.controlsContainer}>
        {devMode && (
          <TouchableOpacity 
            style={[styles.button, styles.backButton]} 
            onPress={movePlayerBackward}
          >
            <Text style={styles.buttonText}>Move Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.cardButton]} 
          onPress={drawCard}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Drawing..." : "Draw Card"}
          </Text>
        </TouchableOpacity>
        
        {devMode && (
          <TouchableOpacity 
            style={[styles.button, styles.forwardButton]} 
            onPress={movePlayerForward}
          >
            <Text style={styles.buttonText}>Move Forward</Text>
          </TouchableOpacity>
        )}
      </View>
      
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#1565C0',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  cardInfo: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 3,
  },
  notebookIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  boardContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  backButton: {
    backgroundColor: '#f44336',
  },
  cardButton: {
    backgroundColor: '#9C27B0',
  },
  forwardButton: {
    backgroundColor: '#4CAF50',
  },
  homeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default GameBoardScreen;