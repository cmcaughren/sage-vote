// components/Card.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView, ActivityIndicator } from 'react-native';
import DiceRoller from './DiceRoller';
import { saveNotebookEntry, getNotebookEntries } from '../utilities/asyncStorage';
import { styles } from '../styles/components/Card.styles';
import { COLORS } from '../styles/theme/colors';

const Card = ({ card, onClose, onAction, devMode = false }) => {
  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [hasVisitedLink, setHasVisitedLink] = useState(false);
  const [checkingNotebook, setCheckingNotebook] = useState(true);
  const [notebookEntryId, setNotebookEntryId] = useState(null);
  const [currentCardLinkClicked, setCurrentCardLinkClicked] = useState(false);

  // Check if this card needs a dice roll
  const needsDiceRoll = Object.keys(card.opt_actions).length > 1;

  // Check if the URL is already in the notebook when component mounts
  useEffect(() => {
    const checkNotebook = async () => {
      setCheckingNotebook(true);

      try {
        // Get all notebook entries
        const entries = await getNotebookEntries();

        // Check if current URL is already in notebook
        const urlExists = entries.some(entry => entry.url === card.url);
        console.log(`Card URL ${card.url} exists in notebook: ${urlExists}`);

        // If URL already exists, we don't need to visit it
        setHasVisitedLink(urlExists);

        // Create a unique ID for this card's potential notebook entry
        const entryId = `${card.id}-${Date.now()}`;
        setNotebookEntryId(entryId);
      } catch (error) {
        console.error("Error checking notebook:", error);
        // In case of error, fallback to allowing continue
        setHasVisitedLink(true);
      } finally {
        setCheckingNotebook(false);
      }
    };

    checkNotebook();

    // Set up dice roller for cards that need it
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
      try {
        // Mark that the link has been clicked during this card visit
        setCurrentCardLinkClicked(true);

        // Create a notebook entry if it doesn't exist already
        if (!hasVisitedLink && notebookEntryId) {
          // Save to notebook, will be ignored if URL already exists
          await saveNotebookEntry({
            id: notebookEntryId,
            url: card.url,
            description: card.description,
            category: card.category || "Uncategorized"
          });

          // Mark as visited - this enables the Continue button
          setHasVisitedLink(true);
        }

        // Open the URL
        Linking.openURL(card.url);
      } catch (error) {
        console.error("Error in handleLearnMore:", error);
        // In case of error, fallback to allowing continue
        setHasVisitedLink(true);
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

  // Used to check if Continue should be enabled - both needs dice roll if applicable AND visited link
  const canContinue = (!needsDiceRoll || (needsDiceRoll && diceResult !== null)) &&
    (hasVisitedLink || devMode);

  // Button text changes based on whether link visit is required
  const getContinueButtonText = () => {
    if (!canContinue) {
      if (needsDiceRoll && diceResult === null) {
        return 'Waiting for dice roll...';
      }
      return 'Visit link to continue';
    }
    return 'Continue';
  };

  // Get Learn More button style based on various states
  const getLearnMoreButtonStyle = () => {
    if (devMode) {
      // In dev mode, just use standard button
      return styles.learnButton;
    }

    // If the link is NOT already in the notebook
    if (!hasVisitedLink) {
      // Not clicked yet in this session - dark periwinkle with emphasis
      if (!currentCardLinkClicked) {
        return [
          styles.learnButton,
          {
            backgroundColor: COLORS.info, // Dark periwinkle color
            shadowColor: COLORS.info,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 5,
          }
        ];
      }
      // Clicked in this session - light periwinkle
      else {
        return [
          styles.learnButton,
          { backgroundColor: COLORS.secondary } // Light periwinkle
        ];
      }
    }

    // Link is ALREADY in notebook - always light periwinkle
    return [
      styles.learnButton,
      { backgroundColor: COLORS.secondary } // Light periwinkle
    ];
  };

  // Get Learn More button text with/without sparkles
  const getLearnMoreButtonText = () => {
    // Only show sparkles if link is not in notebook and hasn't been clicked yet
    if (!devMode && !hasVisitedLink && !currentCardLinkClicked) {
      return '✨ Learn More ✨';
    }
    return 'Learn More';
  };

  // Render loading indicator while checking notebook
  if (checkingNotebook) {
    return (
      <View style={styles.cardContainer}>
        <View style={[styles.card, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 20 }}>Loading card...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Fixed Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {card.category || "Political Scenario"}
          </Text>
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
          {/* Learn More button with dynamic styling */}
          <TouchableOpacity
            style={getLearnMoreButtonStyle()}
            onPress={handleLearnMore}
          >
            <Text style={styles.learnButtonText}>
              {getLearnMoreButtonText()}
            </Text>
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
              {getContinueButtonText()}
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