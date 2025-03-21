import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';

// Colors from our updated theme
const COLORS = {
  primary: '#52b9a9',   // Teal
  secondary: '#ff9248', // Orange
  tertiary: '#87CEEB',  // Sky Blue
  background: '#f5f7fa', // Light background
  white: '#ffffff',
  dark: '#333333'
};

interface WinningPopupProps {
  visible: boolean;
  onRequestClose?: () => void;
}

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Simple confetti implementation directly in the WinningPopup
const WinningPopup: React.FC<WinningPopupProps> = ({ visible, onRequestClose }) => {
  const router = useRouter();
  
  // Create confetti pieces
  const confettiPieces = React.useMemo(() => {
    if (!visible) return [];
    
    const pieces = [];
    const confettiColors = [
      COLORS.primary, 
      COLORS.secondary, 
      COLORS.tertiary, 
      '#FFD700', // Gold
      '#FF69B4', // Hot Pink
      '#9370DB', // Medium Purple
      '#00CED1', // Dark Turquoise
      '#FF6347', // Tomato
      '#32CD32'  // Lime Green
    ];
    
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

  const handleReturnHome = () => {
    if (onRequestClose) {
      onRequestClose();
    }
    router.push('/');
  };

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onRequestClose}
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
              style={styles.homeButton}
              onPress={handleReturnHome}
            >
              <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>
            
            {onRequestClose && (
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={onRequestClose}
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

const styles = StyleSheet.create({
  confettiContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20, // Higher than modal background
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Lower than confetti
  },
  popupContainer: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  submessage: {
    fontSize: 16,
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
  },
  homeButton: {
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
  },
  continueText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  confettiPiece: {
    position: 'absolute',
    borderRadius: 3,
  },
});

export default WinningPopup;