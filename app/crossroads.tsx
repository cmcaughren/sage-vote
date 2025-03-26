// app/crossroads.tsx
import React, { useState } from "react";
import { 
  View, 
  Text, 
  SafeAreaView,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import DiceRoller from "../components/DiceRoller";
import { useGameContext } from "../context/GameContext";
import { styles } from "../styles/screens/Crossroads.styles";
import { COLORS } from "../styles/theme/colors";

export default function CrossroadsScreen() {
  const { setTransportMode } = useGameContext();
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const cardSize = Math.min((screenWidth - 60) / 3, 100); // Divide available space by 3 for square cards

  const handleRollComplete = (result) => {
    // Set transport mode based on dice result
    let mode;
    if (result >= 1 && result <= 3) {
      mode = "bus";
    } else if (result >= 4 && result <= 5) {
      mode = "carpool";
    } else {
      mode = "bicycle";
    }
    
    // Update context
    setTransportMode(mode);
    
    // Keep options visible and navigate after a short delay
    setTimeout(() => {
      router.push("/gameboard");
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          You've reached a crossroads!
        </Text>
        
        <Text style={styles.subtitle}>
          Roll the dice to determine which transportation method you'll use to get to the polling station.
        </Text>
        
        {/* Information blurb */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Each transportation method has its own path to the polling station with unique challenges and opportunities to learn about Canadian politics!
          </Text>
        </View>
        
        {/* Transport options now ABOVE the dice roller */}
        {showOptions && (
          <View style={styles.optionsContainer}>
            {/* Bus Option */}
            <View style={[styles.optionCard, { width: cardSize, height: cardSize }]}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.tertiary }]}>
                <Text style={styles.optionEmoji}>🚌</Text>
              </View>
              <Text style={styles.optionTitle}>Public Transit</Text>
              <Text style={styles.optionDescription}>Roll 1-3</Text>
              <Text style={styles.optionSubtext}>20 spaces</Text>
            </View>
            
            {/* Carpool Option */}
            <View style={[styles.optionCard, { width: cardSize, height: cardSize }]}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.secondary }]}>
                <Text style={styles.optionEmoji}>🚗</Text>
              </View>
              <Text style={styles.optionTitle}>Carpool</Text>
              <Text style={styles.optionDescription}>Roll 4-5</Text>
              <Text style={styles.optionSubtext}>13 spaces</Text>
            </View>
            
            {/* Bicycle Option */}
            <View style={[styles.optionCard, { width: cardSize, height: cardSize }]}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.primary }]}>
                <Text style={styles.optionEmoji}>🚲</Text>
              </View>
              <Text style={styles.optionTitle}>Bicycle</Text>
              <Text style={styles.optionDescription}>Roll 6</Text>
              <Text style={styles.optionSubtext}>11 spaces</Text>
            </View>
          </View>
        )}

        {/* Dice roller now below the options */}
        <View style={styles.diceContainer}>
          <DiceRoller onRollComplete={handleRollComplete} />
        </View>
      </View>
    </SafeAreaView>
  );
}