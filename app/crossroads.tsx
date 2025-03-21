import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import DiceRoller from "../components/ui/DiceRoller";
import { useGameContext } from "../context/GameContext";

// Colors from our updated theme
const COLORS = {
  primary: '#52b9a9',   // Teal
  secondary: '#ff9248', // Orange
  busBlue: '#87CEEB',   // Sky Blue
  carpoolTeal: '#a6dbd1', // Light Teal
  bikeOrange: '#ffaa70', // Light Orange
  background: '#f5f7fa', // Light background
  white: '#ffffff',
  dark: '#333333'
};

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
              <View style={[styles.optionIcon, { backgroundColor: COLORS.busBlue }]}>
                <Text style={styles.optionEmoji}>🚌</Text>
              </View>
              <Text style={styles.optionTitle}>Public Transit</Text>
              <Text style={styles.optionDescription}>Roll 1-3</Text>
              <Text style={styles.optionSubtext}>20 spaces</Text>
            </View>
            
            {/* Carpool Option */}
            <View style={[styles.optionCard, { width: cardSize, height: cardSize }]}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.carpoolTeal }]}>
                <Text style={styles.optionEmoji}>🚗</Text>
              </View>
              <Text style={styles.optionTitle}>Carpool</Text>
              <Text style={styles.optionDescription}>Roll 4-5</Text>
              <Text style={styles.optionSubtext}>13 spaces</Text>
            </View>
            
            {/* Bicycle Option */}
            <View style={[styles.optionCard, { width: cardSize, height: cardSize }]}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.bikeOrange }]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginBottom: 15,
    maxWidth: 400,
  },
  infoContainer: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    maxWidth: 400,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 20,
  },
  diceContainer: {
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
    marginTop: 5,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionEmoji: {
    fontSize: 20,
  },
  optionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 11,
    color: COLORS.dark + 'CC',
    fontWeight: '500',
    textAlign: 'center',
  },
  optionSubtext: {
    fontSize: 10,
    color: COLORS.dark + '80',
    marginTop: 2,
    textAlign: 'center',
  }
});