// app/index.tsx
// Responsive home screen layout

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../styles/screens/Home.styles";
import { COLORS } from "../styles/theme/colors";

// Get screen dimensions for responsive calculations
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.contentContainer}>
        {/* Logo Section - Flexible sizing */}
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tagline Section - With responsive spacing */}
        <View style={styles.taglineSection}>
          <Text style={styles.taglinePrimary}>Learn Canadian Politics.</Text>
          <Text style={styles.taglineSecondary}>
            Roll the dice, learn the system, cast your vote with confidence.
          </Text>
        </View>

        {/* Buttons with responsive spacing */}
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
        </View>

        {/* Version text with absolute positioning */}
        <Text style={styles.versionText}>Version 1.0.1</Text>
      </View>
    </SafeAreaView>
  );
}