import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions,
  StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { useGameContext } from "../context/GameContext";

// Colors from our updated theme
const COLORS = {
  primary: '#52b9a9',   // Teal
  secondary: '#ff9248', // Orange
  tertiary: '#87CEEB',  // Sky Blue
  background: '#f5f7fa', // Light background
  white: '#ffffff',
  dark: '#333333'
};

export default function HomeScreen() {
  const { devMode } = useGameContext();
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.contentContainer}>
        {/* Logo Image - Full width */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/Canva_Design.png')} 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // This will maintain the aspect ratio while spanning the full width
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 300,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  notebookButton: {
    backgroundColor: COLORS.tertiary,
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  notebookButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  emojiText: {
    fontSize: 20,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  devModeContainer: {
    backgroundColor: '#ff000030',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  devModeText: {
    color: '#E53935',
    fontSize: 12,
    fontWeight: 'bold',
  },
  versionText: {
    position: 'absolute',
    bottom: 20,
    color: COLORS.dark + '80',
    fontSize: 12,
  }
});