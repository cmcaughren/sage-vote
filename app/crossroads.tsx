// app/crossroads.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import DiceRoller from "../components/DiceRoller";
import { useGameContext } from "../context/GameContext";
import { styles } from "../styles/screens/Crossroads.styles";
import { COLORS } from "../styles/theme/colors";

export default function CrossroadsScreen() {
  const { setTransportMode, setBoardPosition, pathLengths } = useGameContext();
  const router = useRouter();

  // Get screen dimensions for responsive calculations
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Reset player position whenever they're at the crossroads
  useEffect(() => {
    console.log('Crossroads: Resetting player position to 0');
    setBoardPosition(0);
  }, []);

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

    console.log(`Crossroads: Rolled ${result}, setting transport mode to ${mode}`);

    // Update context - set transport mode and ensure position is 0
    setTransportMode(mode);
    setBoardPosition(0); // Explicitly ensure position is reset to 0

    // Navigate to game board
    router.push("/gameboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Section - Title & Subtitle */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>
            You've reached a crossroads!
          </Text>

          <Text style={styles.subtitle}>
            Roll the dice to determine which transportation method you'll use.
          </Text>

          {/* Information blurb */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Each transportation method has its own path to the polling station with unique challenges and opportunities to learn about Canadian politics!
            </Text>
          </View>
        </View>

        // Dice roller in the middle - with flexible height
        <View style={[
          styles.diceContainer,
          { height: Math.min(screenHeight * 0.45, 400) }
        ]}>
          <DiceRoller
            onRollComplete={handleRollComplete}
          // Remove the compact parameter entirely
          />
        </View>

        {/* Transport options with improved responsive layout */}
        <View style={styles.optionsContainer}>
          {/* Bus Option */}
          <View style={[styles.optionCard, styles.optionCardResponsive]}>
            <View style={styles.optionContent}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.busPath.base }]}>
                <Text style={styles.optionEmoji}>🚌</Text>
              </View>
              <Text style={styles.optionTitle}>Public Transit</Text>
              <Text style={styles.optionDescription}>Roll 1-3</Text>
              <Text style={styles.optionSubtext}>{pathLengths.bus} spaces</Text>
            </View>
          </View>

          {/* Carpool Option */}
          <View style={[styles.optionCard, styles.optionCardResponsive]}>
            <View style={styles.optionContent}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.carpoolPath.base }]}>
                <Text style={styles.optionEmoji}>🚗</Text>
              </View>
              <Text style={styles.optionTitle}>Carpool</Text>
              <Text style={styles.optionDescription}>Roll 4-5</Text>
              <Text style={styles.optionSubtext}>{pathLengths.carpool} spaces</Text>
            </View>
          </View>

          {/* Bicycle Option */}
          <View style={[styles.optionCard, styles.optionCardResponsive]}>
            <View style={styles.optionContent}>
              <View style={[styles.optionIcon, { backgroundColor: COLORS.bicyclePath.base }]}>
                <Text style={styles.optionEmoji}>🚲</Text>
              </View>
              <Text style={styles.optionTitle}>Bicycle</Text>
              <Text style={styles.optionDescription}>Roll 6</Text>
              <Text style={styles.optionSubtext}>{pathLengths.bicycle} spaces</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}