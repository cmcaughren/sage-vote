import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import DiceRoller from "../components/ui/DiceRoller";
import { useGameContext } from "../context/GameContext";

export default function CrossroadsScreen() {
  const { setTransportMode } = useGameContext();
  const router = useRouter();

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
    
    // Navigate immediately
    router.push("/gameboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You've come to a Crossroads! Which path will you take?
      </Text>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instruction}>1 - 3: Public Transit</Text>
        <Text style={styles.instruction}>4 - 5: Car Pool</Text>
        <Text style={styles.instruction}>6: Bicycle</Text>
      </View>

      {/* The DiceRoller now handles everything */}
      <DiceRoller onRollComplete={handleRollComplete} />
      
      {/* Remove any Continue button from here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  instructionsContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  instruction: {
    fontSize: 18,
    marginBottom: 10,
  },
});