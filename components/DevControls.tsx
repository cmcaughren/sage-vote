// components/DevControls.tsx
// Create a new component for developer controls
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/screens/GameBoard.styles';

interface DevControlsProps {
   movePlayerForward: () => void;
   movePlayerBackward: () => void;
   boardPosition: number;
   transportMode: string;
   availableCardCount: number;
   totalCardCount: number;
   cardsLoading: boolean;
   goHome: () => void;
}

const DevControls: React.FC<DevControlsProps> = ({
   movePlayerForward,
   movePlayerBackward,
   boardPosition,
   transportMode,
   availableCardCount,
   totalCardCount,
   cardsLoading,
   goHome
}) => {
   return (
      <View style={styles.devContainer}>
         {/* Position display */}
         <Text style={styles.devText}>
            Position: {boardPosition} | Mode: {transportMode}
         </Text>

         {/* Card info */}
         <Text style={styles.devText}>
            Cards: {availableCardCount} available / {totalCardCount} total
         </Text>

         {/* Controls */}
         <View style={styles.controlsContainer}>
            <TouchableOpacity
               style={[styles.button, styles.backButton]}
               onPress={movePlayerBackward}
            >
               <Text style={styles.buttonText}>Move Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.button, styles.forwardButton]}
               onPress={movePlayerForward}
            >
               <Text style={styles.buttonText}>Move Forward</Text>
            </TouchableOpacity>
         </View>

         {/* Home button */}
         <TouchableOpacity
            style={styles.homeButton}
            onPress={goHome}
         >
            <Text style={styles.buttonText}>Home</Text>
         </TouchableOpacity>
      </View>
   );
};

export default DevControls;