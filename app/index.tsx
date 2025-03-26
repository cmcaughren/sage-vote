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
        {/* Logo Image - Full width */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Educate yourself on Canadian politics while playing!</Text>

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
            <Text style={styles.notebookButtonText}>
              <Text style={styles.emojiText}>📔</Text> My Notebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/create-card')}
          >
            <Text style={styles.secondaryButtonText}>Create Cards</Text>
          </TouchableOpacity>
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