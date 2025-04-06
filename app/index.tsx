// app/index.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { useGameContext } from "../context/GameContext";
import { styles } from "../styles/screens/Home.styles";
import { COLORS } from "../styles/theme/colors";
import { loadGameProgress } from "../utilities/asyncStorage";

export default function HomeScreen() {
  const { devMode, setTransportMode, setBoardPosition } = useGameContext();
  const router = useRouter();

  // Check for game state when home screen loads
  useEffect(() => {
    const checkGameState = async () => {
      try {
        console.log('HomeScreen: Checking game state on load');

        // Load game state
        const gameState = await loadGameProgress();

        // If null or explicitly reset (i.e., player came from winning popup),
        // ensure context is also reset to defaults
        if (!gameState || gameState.resetTimestamp) {
          console.log('HomeScreen: Ensuring context matches reset state');

          // Reset important game state values directly in context
          setTransportMode(null);
          setBoardPosition(0);
        }
      } catch (error) {
        console.error('Error checking game state on home screen:', error);
      }
    };

    checkGameState();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.contentContainer}>
        {/* Logo Image - Full width */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Democracy is a Journey: Your path to Canadian Political Literacy starts here!</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/registertovote')}
          >
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.notebookButton]}
            onPress={() => router.push('/notebook')}
          >
            <Text style={styles.notebookButtonText}>Notebook</Text>
          </TouchableOpacity>

          {/* Only show Create Cards button in dev mode */}
          {devMode && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/create-card')}
            >
              <Text style={styles.secondaryButtonText}>Create Cards</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Dev Mode Indicator */}
        {devMode && (
          <View style={styles.devModeContainer}>
            <Text style={styles.devModeText}>Developer Mode</Text>
          </View>
        )}

        {/* Footer - Version number etc. */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}