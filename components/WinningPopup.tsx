import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/components/WinningPopup.styles';
import { COLORS } from '../styles/theme/colors';
import resetGameState from '../utilities/resetGame';
import { useGameContext } from '../context/GameContext';

interface WinningPopupProps {
  visible: boolean;
  onRequestClose?: () => void;
}

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Simple confetti implementation directly in the WinningPopup
const WinningPopup: React.FC<WinningPopupProps> = ({ visible, onRequestClose }) => {
  const router = useRouter();
  const { devMode } = useGameContext();

  // Create confetti pieces
  const confettiPieces = React.useMemo(() => {
    if (!visible) return [];

    const pieces = [];
    // Use confetti colors from the theme
    const confettiColors = COLORS.confetti;

    // Increased confetti count from 100 to 300
    for (let i = 0; i < 300; i++) {
      const animValue = new Animated.Value(0);
      const size = Math.random() * 12 + 8; // Slightly larger pieces
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const startX = Math.random() * width;
      const fallDuration = 3000 + Math.random() * 3000;
      const horizontalMovement = (Math.random() - 0.5) * 300; // More horizontal movement

      // Add variety to confetti shapes - some squares, some rectangles
      const isSquare = Math.random() > 0.7; // 30% chance of being square
      const aspectRatio = isSquare ? 1 : 0.4 + Math.random() * 0.3; // Between 0.4 and 0.7 for rectangles

      pieces.push({
        id: i,
        animValue,
        size,
        color,
        startX,
        fallDuration,
        horizontalMovement,
        aspectRatio,
        delay: Math.random() * 1500, // Add delay for more natural look
      });
    }

    return pieces;
  }, [visible]);

  // Animate confetti when visible
  React.useEffect(() => {
    if (visible && confettiPieces.length > 0) {
      confettiPieces.forEach(piece => {
        Animated.timing(piece.animValue, {
          toValue: 1,
          duration: piece.fallDuration,
          delay: piece.delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [visible, confettiPieces]);

  const handleReturnHome = async () => {
    try {
      console.log('WinningPopup: Starting game reset process');

      // First close the popup to improve perceived performance
      if (onRequestClose) {
        onRequestClose();
      }

      // Reset the game state using our utility function
      const resetSuccess = await resetGameState();
      console.log('WinningPopup: Game reset completed with result:', resetSuccess);

      // Add a small delay to ensure AsyncStorage operations complete
      await new Promise(resolve => setTimeout(resolve, 300));

      // Finally navigate to the home screen
      console.log('WinningPopup: Navigating to home screen');
      router.push('/');
    } catch (error) {
      console.error("Error in handleReturnHome:", error);
      // Navigate home anyway to avoid trapping the user
      router.push('/');
    }
  };

  // Continue playing will just close the popup
  // The game will remain in its current state
  const handleContinuePlaying = () => {
    if (onRequestClose) {
      onRequestClose();
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={devMode ? handleContinuePlaying : handleReturnHome}
    >
      {/* Modal background and popup */}
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>🎉 Congratulations! 🎉</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.message}>
              You've reached the Polling Station and cast your ballot!
            </Text>

            <Text style={styles.submessage}>
              We hope you learned a lot about Canadian Politics along the way 🍁
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.homeButton, !devMode && { marginBottom: 0 }]}
              onPress={handleReturnHome}
            >
              <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>

            {/* Only show Continue Playing button in dev mode */}
            {devMode && onRequestClose && (
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinuePlaying}
              >
                <Text style={styles.continueText}>Continue Playing</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Confetti container that covers the entire screen but doesn't block touches */}
      <View style={styles.confettiContainer} pointerEvents="none">
        {/* Confetti pieces */}
        {confettiPieces.map(piece => {
          // Animation from top of screen to bottom
          const translateY = piece.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, height + 50], // Start at top (0) and fall past bottom of screen
          });

          const translateX = piece.animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, piece.horizontalMovement, piece.horizontalMovement * 1.5],
          });

          const rotate = piece.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 720)}deg`],
          });

          const opacity = piece.animValue.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [1, 1, 0],
          });

          return (
            <Animated.View
              key={piece.id}
              style={[
                styles.confettiPiece,
                {
                  width: piece.size,
                  height: piece.size * piece.aspectRatio,
                  backgroundColor: piece.color,
                  left: piece.startX,
                  top: -piece.size, // Start just above the screen
                  transform: [{ translateY }, { translateX }, { rotate }],
                  opacity,
                }
              ]}
              pointerEvents="none"
            />
          );
        })}
      </View>
    </Modal>
  );
};

export default WinningPopup;