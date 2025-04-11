/// components/ui/DiceRoller.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { styles } from '../styles/components/DiceRoller.styles';
import { COLORS } from '../styles/theme/colors';

interface DiceRollerProps {
  onRollComplete: (result: number) => void;
  compact?: boolean;
  hideTransportInfo?: boolean;
  shouldRoll?: boolean;
}

const DiceRoller: React.FC<DiceRollerProps> = ({
  onRollComplete,
  compact = false,
  hideTransportInfo = false,
  shouldRoll = false
}) => {
  // Change to a combined state object for atomic updates
  const [diceState, setDiceState] = useState({
    currentValue: 1,
    finalValue: 1,
    phase: 'ready', // 'ready', 'rolling', 'transitioning', 'result'
  });

  // Animation values
  const animation = useRef(new Animated.Value(0)).current;
  const diceChangeInterval = useRef<NodeJS.Timeout | null>(null);

  // Clean up animation when component unmounts
  useEffect(() => {
    return () => {
      animation.stopAnimation();
      if (diceChangeInterval.current) {
        clearInterval(diceChangeInterval.current);
      }
    };
  }, []);

  // Watch for shouldRoll changes to trigger dice roll
  useEffect(() => {
    if (shouldRoll && diceState.phase === 'ready') {
      rollDice();
    }
  }, [shouldRoll]);

  const rollDice = () => {
    if (diceState.phase !== 'ready') return;

    // Update state atomically
    setDiceState(prev => ({
      ...prev,
      phase: 'rolling'
    }));

    // Reset animation value
    animation.setValue(0);

    // Generate the final dice value, but don't show it yet
    const newValue = Math.floor(Math.random() * 6) + 1;

    // Start rapidly changing the visible dice face
    if (diceChangeInterval.current) {
      clearInterval(diceChangeInterval.current);
    }

    diceChangeInterval.current = setInterval(() => {
      // Show random faces during the roll
      setDiceState(prev => ({
        ...prev,
        currentValue: Math.floor(Math.random() * 6) + 1
      }));
    }, 100); // Change face every 100ms

    // Create animation sequence
    Animated.timing(animation, {
      toValue: 1,
      duration: 1800,
      easing: Easing.bounce,
      useNativeDriver: true
    }).start(() => {
      // Stop changing the dice face
      if (diceChangeInterval.current) {
        clearInterval(diceChangeInterval.current);
      }

      // Important: Update all related state in one atomic operation
      setDiceState({
        currentValue: newValue,
        finalValue: newValue,
        phase: 'transitioning'
      });

      // Delay showing the result - again, atomic update
      setTimeout(() => {
        setDiceState(prev => ({
          ...prev,
          phase: 'result'
        }));

        // Automatically call onRollComplete directly when in compact mode
        // This will pass the dice result to the parent without requiring a button click
        if (compact) {
          setTimeout(() => {
            // Store the final value to ensure it doesn't change
            const finalValue = newValue;
            console.log('DiceRoller: Auto-continuing in compact mode with result:', finalValue);

            // Call onRollComplete directly with the final value
            onRollComplete(finalValue);
          }, 500); // Short delay to let the result show before auto-continuing
        }
      }, 300);
    });
  };

  // Handle continue button press
  const handleContinue = () => {
    console.log('DiceRoller: calling onRollComplete with value:', diceState.finalValue);
    onRollComplete(diceState.finalValue);
  };

  // Enhanced animations with more bounce and movement - same for both modes
  const rotate = animation.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [
      '0deg', '120deg', '240deg', '360deg', '480deg',
      '600deg', '720deg', '840deg', '960deg', '1020deg', '1080deg'
    ]
  });

  // More complex movement pattern to simulate bouncing - same for both modes
  const translateX = animation.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
    outputRange: [0, 80, -60, 100, -80, 60, -40, 30, -20, 10, -5, 0]
  });

  const translateY = animation.interpolate({
    inputRange: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
    outputRange: [0, -100, -30, -120, -20, 80, -60, 40, -30, 20, -15, 10, -5, 0]
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [1, 1.3, 0.9, 1.2, 0.95, 1]
  });

  // Function to render the dice face with dots
  const renderDiceFace = (value) => {
    // Dice face rendering code
    return (
      <View style={styles.diceFace}>
        {/* 3x3 grid of potential dot positions */}
        <View style={styles.diceGrid}>
          {/* Top row */}
          <View style={[styles.dotContainer, styles.topLeft]}>
            {(value === 4 || value === 5 || value === 6) && <View style={styles.dot} />}
          </View>
          <View style={styles.dotContainer}></View>
          <View style={[styles.dotContainer, styles.topRight]}>
            {(value === 2 || value === 3 || value === 4 || value === 5 || value === 6) && <View style={styles.dot} />}
          </View>

          {/* Middle row */}
          <View style={[styles.dotContainer, styles.middleLeft]}>
            {(value === 6) && <View style={styles.dot} />}
          </View>
          <View style={[styles.dotContainer, styles.middle]}>
            {(value === 1 || value === 3 || value === 5) && <View style={styles.dot} />}
          </View>
          <View style={[styles.dotContainer, styles.middleRight]}>
            {(value === 6) && <View style={styles.dot} />}
          </View>

          {/* Bottom row */}
          <View style={[styles.dotContainer, styles.bottomLeft]}>
            {(value === 2 || value === 3 || value === 4 || value === 5 || value === 6) && <View style={styles.dot} />}
          </View>
          <View style={styles.dotContainer}></View>
          <View style={[styles.dotContainer, styles.bottomRight]}>
            {(value === 4 || value === 5 || value === 6) && <View style={styles.dot} />}
          </View>
        </View>
      </View>
    );
  };

  // Calculate bottom section height dynamically
  const getBottomSectionHeight = () => {
    if (compact) {
      return diceState.phase === 'ready' ? 50 : 10;
    } else {
      return 150;
    }
  };

  // Return statement with responsive considerations
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {/* Animated dice */}
      <Animated.View
        style={[
          styles.diceContainer,
          compact && styles.compactDiceContainer,
          {
            transform: [
              { rotate },
              { translateX },
              { translateY },
              { scale }
            ]
          }
        ]}
      >
        {renderDiceFace(diceState.currentValue)}
      </Animated.View>

      {/* Bottom section with responsive height */}
      <View style={[
        styles.bottomSection,
        compact && styles.compactBottomSection
      ]}>
        {/* Roll button always shows in ready phase */}
        {diceState.phase === 'ready' && (
          <TouchableOpacity
            style={[styles.rollButton, compact && styles.compactButton]}
            onPress={rollDice}
          >
            <Text style={styles.rollButtonText}>Roll the dice!</Text>
          </TouchableOpacity>
        )}

        {/* Only show activity indicator in non-compact mode */}
        {diceState.phase === 'transitioning' && !compact && (
          <ActivityIndicator size="large" color={COLORS.primary} />
        )}

        {/* Result container */}
        {diceState.phase === 'result' && !compact && (
          <View style={styles.resultContainer}>
            <Text style={[styles.resultText, compact && styles.compactResultText]}>
              You rolled a {diceState.finalValue}!
            </Text>

            {!hideTransportInfo && (
              <Text style={styles.transportText}>
                Transport Mode: {getTransportMethod()}
              </Text>
            )}

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  // Determine transport method - only used in non-compact mode
  function getTransportMethod() {
    if (diceState.finalValue <= 3) {
      return 'Public Transit';
    } else if (diceState.finalValue <= 5) {
      return 'Car Pool';
    } else {
      return 'Bicycle';
    }
  }
};

export default DiceRoller;