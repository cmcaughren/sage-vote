// app/index.tsx
import React from "react";
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

export default function HomeScreen() {
  const { devMode } = useGameContext();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.taglinePrimary}>Learn Canadian Politics</Text>
          <Text style={styles.taglineSecondary}>Roll the dice, learn the system, cast your vote with confidence.</Text>
        </View>

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

          {/* Dev mode button if needed */}
          {devMode && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/create-card')}
            >
              <Text style={styles.secondaryButtonText}>Create Cards</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Version text */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}