import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

interface ConfettiProps {
  count?: number;
  duration?: number;
  colors?: string[];
  isActive: boolean;
}

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Confetti: React.FC<ConfettiProps> = ({ 
  count = 200, 
  duration = 8000, 
  colors = ['#52b9a9', '#ff9248', '#87CEEB', '#FFD700', '#FF69B4', '#9370DB'], 
  isActive 
}) => {
  // Create array for confetti pieces
  const confettiPieces = useRef<Array<{
    animation: Animated.Value;
    size: number;
    color: string;
    rotationSpeed: number;
    rotationDirection: number;
    opacity: Animated.Value;
    horizontalAnimation: Animated.Value;
    horizontalStart: number;
    horizontalDistance: number;
  }>>([]);

  // Initialize confetti pieces
  useEffect(() => {
    if (isActive) {
      confettiPieces.current = [];
      
      // Create confetti pieces
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 15 + 8; // Size between 8 and 23 (increased)
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotationSpeed = Math.random() * 10 + 5; // Rotation speed between 5 and 15
        const rotationDirection = Math.random() > 0.5 ? 1 : -1; // Direction of rotation
        
        // Horizontal animation setup
        const horizontalStart = Math.random() * screenWidth;
        const horizontalDistance = (Math.random() - 0.5) * 300; // Distance to move horizontally (increased from 200)

        confettiPieces.current.push({
          animation: new Animated.Value(0),
          size,
          color,
          rotationSpeed,
          rotationDirection,
          opacity: new Animated.Value(1),
          horizontalAnimation: new Animated.Value(horizontalStart),
          horizontalStart,
          horizontalDistance,
        });
      }
      
      // Animate all confetti pieces
      confettiPieces.current.forEach(piece => {
        // Falling animation
        Animated.timing(piece.animation, {
          toValue: 1,
          duration: duration + Math.random() * 2000, // Random duration variance
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        
        // Horizontal drift animation
        Animated.timing(piece.horizontalAnimation, {
          toValue: piece.horizontalStart + piece.horizontalDistance,
          duration: duration + Math.random() * 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        
        // Fade out toward the end
        Animated.timing(piece.opacity, {
          toValue: 0,
          duration: duration + Math.random() * 1000,
          delay: duration * 0.8, // Start fading out at 80% of the way through (was 70%)
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isActive, count, duration, colors]);

  if (!isActive) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {confettiPieces.current.map((piece, index) => {
        // Rotation animation
        const rotation = piece.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${piece.rotationDirection * piece.rotationSpeed * 360}deg`]
        });
        
        // Vertical position animation
        const translateY = piece.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, screenHeight + 50] // Start higher up
        });
        
        // Shape variations - some square, some rectangle
        const isSquare = index % 3 === 0;
        const height = isSquare ? piece.size : piece.size * 0.6;
        const width = piece.size;
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.confetti,
              {
                width: width,
                height: height,
                backgroundColor: piece.color,
                transform: [
                  { translateY },
                  { translateX: piece.horizontalAnimation },
                  { rotate: rotation }
                ],
                opacity: piece.opacity,
                left: piece.horizontalStart,
                top: -20,
              }
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999, // Extremely high z-index to ensure it's above everything
    elevation: 9999, // For Android
  },
  confetti: {
    position: 'absolute',
    borderRadius: 2,
  }
});

export default Confetti;