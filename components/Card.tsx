// components/ui/Card.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView, Alert } from 'react-native';
import DiceRoller from './DiceRoller';
import { saveNotebookEntry } from '../utilities/asyncStorage';
import { styles } from '../styles/components/Card.styles';

const Card = ({ card, onClose, onAction, devMode = false }) => {
  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  
  // Check if this card needs a dice roll
  const needsDiceRoll = Object.keys(card.opt_actions).length > 1;
  
  // Set up dice roller for cards that need it
  useEffect(() => {
    if (needsDiceRoll) {
      setIsRolling(true);
    }
  }, []);
  
  // Find which action applies based on dice roll
  const getActionForDiceRoll = (roll) => {
    console.log('Looking for action for roll:', roll);
    for (const [diceValues, action] of Object.entries(card.opt_actions)) {
      const values = diceValues.split(',').map(v => parseInt(v.trim()));
      console.log('Checking values:', values, 'includes', roll, '?', values.includes(roll));
      if (values.includes(roll)) {
        return action;
      }
    }
    console.log('No match found, using default action');
    // Default fallback if no matching dice value found
    return Object.values(card.opt_actions)[0];
  };
  
  const handleLearnMore = async () => {
    if (card.url) {
      // Silently save to notebook before opening the link
      try {
        // Create a unique ID using the card ID and a timestamp
        const entryId = `${card.id}-${Date.now()}`;
        
        // Save to notebook (no need to check if it was added)
        await saveNotebookEntry({
          id: entryId,
          url: card.url,
          description: card.description
        });
        
        // Immediately open the URL without any notification
        Linking.openURL(card.url);
      } catch (error) {
        console.error("Error saving to notebook:", error);
        // Still open the URL even if saving fails
        Linking.openURL(card.url);
      }
    }
  };
  
  // This is called when the dice roll animation completes
  const handleRollComplete = (result) => {
    console.log('Card: handleRollComplete called with result:', result);
    
    // Force this to be a number
    const numericResult = Number(result);
    
    // Update state
    setDiceResult(numericResult);
    
    console.log('Updated diceResult to:', numericResult);
  };
  
  // Called when Continue button is pressed
  const handleContinue = () => {
    console.log('Card: handleContinue called');
    console.log('Current dice result:', diceResult);
    
    let actionCode;
    
    if (needsDiceRoll && diceResult) {
      // Get action based on dice roll
      const actionToTake = getActionForDiceRoll(diceResult);
      actionCode = actionToTake[0];
      console.log('Taking action from dice roll:', actionCode);
    } else if (!needsDiceRoll) {
      // Simple card - just get the one action
      actionCode = Object.values(card.opt_actions)[0][0];
      console.log('Taking action from simple card:', actionCode);
    } else {
      console.log('No valid action found');
      return;
    }
    
    // Actually apply the action
    if (actionCode) {
      console.log('Calling onAction with:', actionCode);
      onAction(actionCode);
    }
  };
  
  // Get the action text to display
  const getActionText = () => {
    if (needsDiceRoll) {
      if (!diceResult) {
        // No text until dice is rolled
        return "";
      } else {
        // Show result based on dice roll
        const action = getActionForDiceRoll(diceResult);
        return action[1];
      }
    } else {
      // Simple card - just show the one action text
      return Object.values(card.opt_actions)[0][1];
    }
  };

  // Used to check if Continue should be enabled
  const canContinue = !needsDiceRoll || (needsDiceRoll && diceResult !== null);
  
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Fixed Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Political Scenario</Text>
        </View>
        
        {/* Scrollable Content Area */}
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.cardDescription}>{card.description}</Text>
          
          {isRolling && needsDiceRoll && (
            <View style={styles.diceContainer}>
              <DiceRoller 
                onRollComplete={handleRollComplete}
                compact={true}
                hideTransportInfo={true}
              />
            </View>
          )}
          
          {diceResult && (
            <View style={styles.actionContainer}>
              <Text style={styles.resultText}>You rolled a {diceResult}!</Text>
              <Text style={styles.actionText}>{getActionText()}</Text>
            </View>
          )}
          
          {!needsDiceRoll && (
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>{getActionText()}</Text>
            </View>
          )}
        </ScrollView>
        
        {/* Fixed Footer with Buttons */}
        <View style={styles.cardFooter}>
          <TouchableOpacity 
            style={styles.learnButton}
            onPress={handleLearnMore}
          >
            <Text style={styles.learnButtonText}>Learn More</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionButton,
              !canContinue && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={!canContinue}
          >
            <Text style={styles.buttonText}>
              {canContinue ? 'Continue' : 'Waiting for dice roll...'}
            </Text>
          </TouchableOpacity>
          
          {/* Only render Close button in dev mode */}
          {devMode && (
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Card;