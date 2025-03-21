// components/ui/DiceRoller.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Easing,
  ActivityIndicator
} from 'react-native';

// Main color from the updated theme
const TEAL_COLOR = '#52b9a9'; // Teal color (previously bus path)

interface DiceRollerProps {
  onRollComplete: (result: number) => void;
  compact?: boolean;
  hideTransportInfo?: boolean;
  shouldRoll?: boolean;
}

const DiceRoller = ({ 
  onRollComplete, 
  compact = false, 
  hideTransportInfo = false, 
  shouldRoll = false 
}: DiceRollerProps) => {
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
    // Your existing dice face rendering code
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
      
      {/* Always show bottom section, but with contents conditionally rendered */}
      <View style={[
        styles.bottomSection, 
        compact && styles.compactBottomSection,
        { height: getBottomSectionHeight() }
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
          <ActivityIndicator size="large" color={TEAL_COLOR} />
        )}
        
        {/* Only show result container in non-compact mode */}
        {diceState.phase === 'result' && !compact && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 400,
  },
  compactContainer: {
    height: 200, //150, // Significantly reduced from 300
    padding: 10,
    marginBottom: 0, // No extra margin at the bottom
  },
  diceContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 40,
  },
  compactDiceContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 20, // Reduced margin 10
  },
  bottomSection: {
    //height: 150, // Fixed height to prevent layout shifts
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactBottomSection: {
    marginTop: 0,
    marginBottom: 0,
    //height: 40, // Greatly reduced for compact mode
  },
  diceFace: {
    width: '100%',
    height: '100%',
    padding: 8,
  },
  diceGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dotContainer: {
    width: '33.33%',
    height: '33.33%',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: '90%',
    height: '90%',
    borderRadius: 50,
    backgroundColor: '#000',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  compactResultText: {
    fontSize: 18,
    marginBottom: 5,
  },
  transportText: {
    fontSize: 18,
    color: TEAL_COLOR,
    marginBottom: 20,
  },
  rollButton: {
    backgroundColor: TEAL_COLOR, // Updated to teal
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  rollButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: TEAL_COLOR, // Updated to teal
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  compactButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  // Additional dot position styles
  topLeft: {},
  topRight: {},
  middleLeft: {},
  middle: {},
  middleRight: {},
  bottomLeft: {},
  bottomRight: {},
});

export default DiceRoller;