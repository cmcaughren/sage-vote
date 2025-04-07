// app/registertovote.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  ActionSheetIOS,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { styles } from "../styles/screens/RegisterToVote.styles";
import { COLORS } from "../styles/theme/colors";
import PROVINCE_ID_URLS, { VOTER_REGISTRATION_URL } from "../constants/provinceUrls";
import {
  checkRegistrationLinksInNotebook,
  saveVoterRegistrationToNotebook,
  saveIdApplicationToNotebook
} from "../utilities/asyncStorage";
import { useGameContext } from "../context/GameContext";

export default function RegisterToVoteScreen() {
  const { devMode } = useGameContext();
  const [selectedTab, setSelectedTab] = useState("identification");
  const [selectedProvince, setSelectedProvince] = useState("Select Province");
  const [checkingNotebook, setCheckingNotebook] = useState(true);

  // Track if links have been visited
  const [idApplied, setIdApplied] = useState(false);
  const [voterRegistered, setVoterRegistered] = useState(false);
  const [idClickedThisSession, setIdClickedThisSession] = useState(false);
  const [voterClickedThisSession, setVoterClickedThisSession] = useState(false);

  const router = useRouter();

  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ];

  // Check if registration links already exist in notebook
  useEffect(() => {
    const checkLinks = async () => {
      setCheckingNotebook(true);

      try {
        // Skip check in dev mode if desired
        if (devMode) {
          setIdApplied(true);
          setVoterRegistered(true);
          setCheckingNotebook(false);
          return;
        }

        const { hasIdApplication, hasVoterRegistration } = await checkRegistrationLinksInNotebook();

        // Set states based on notebook check
        setIdApplied(hasIdApplication);
        setVoterRegistered(hasVoterRegistration);

        console.log("Registration links in notebook:", { hasIdApplication, hasVoterRegistration });
      } catch (error) {
        console.error("Error checking registration links:", error);
        // Fallback to allowing continue in case of error
        setIdApplied(true);
        setVoterRegistered(true);
      } finally {
        setCheckingNotebook(false);
      }
    };

    checkLinks();
  }, [devMode]);

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", ...provinces],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          setSelectedProvince(provinces[buttonIndex - 1]);
        }
      }
    );
  };

  // Updated to save to notebook and mark as visited
  const handleApplyForID = async () => {
    // Get the correct URL based on selected province
    const idUrl = PROVINCE_ID_URLS[selectedProvince] || PROVINCE_ID_URLS["Select Province"];

    try {
      // Save to notebook if not already there
      if (!idApplied) {
        await saveIdApplicationToNotebook(selectedProvince, idUrl);
      }

      // Mark as applied in this session
      setIdApplied(true);
      setIdClickedThisSession(true);

      // Open the URL
      Linking.openURL(idUrl);
    } catch (error) {
      console.error("Error in handleApplyForID:", error);
      // Fallback to just opening the URL
      Linking.openURL(idUrl);
      // And mark as visited anyway
      setIdApplied(true);
    }
  };

  // Updated to save to notebook and mark as visited
  const handleVoterRegistration = async () => {
    try {
      // Save to notebook if not already there
      if (!voterRegistered) {
        await saveVoterRegistrationToNotebook(VOTER_REGISTRATION_URL);
      }

      // Mark as registered in this session
      setVoterRegistered(true);
      setVoterClickedThisSession(true);

      // Open the URL
      Linking.openURL(VOTER_REGISTRATION_URL);
    } catch (error) {
      console.error("Error in handleVoterRegistration:", error);
      // Fallback to just opening the URL
      Linking.openURL(VOTER_REGISTRATION_URL);
      // And mark as visited anyway
      setVoterRegistered(true);
    }
  };

  // Get button style based on visited state
  const getButtonStyle = (isVisited, isClickedThisSession, defaultStyle) => {
    if (!isVisited) {
      // Not yet visited - highlight
      return [
        defaultStyle,
        {
          backgroundColor: COLORS.info, // Dark periwinkle
          shadowColor: COLORS.info,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 5,
        }
      ];
    } else if (isClickedThisSession) {
      // Visited in this session - light periwinkle
      return [
        defaultStyle,
        { backgroundColor: COLORS.secondary } // Light periwinkle
      ];
    }

    // Previously visited - standard style
    return defaultStyle;
  };

  // Get button text based on visited state
  const getButtonText = (isVisited, isClickedThisSession, defaultText) => {
    if (!isVisited && !isClickedThisSession) {
      return `✨ ${defaultText} ✨`;
    }
    return defaultText;
  };

  // User can continue if both links are visited or in dev mode
  const canContinue = (idApplied && voterRegistered) || devMode;

  // Show loading state while checking notebook
  if (checkingNotebook) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>
            Are you ready to make a difference?
          </Text>
          <Text style={styles.subtitle}>
            Before you begin your journey to the polling station, make sure you:
          </Text>

          <View style={styles.eligibilityList}>
            <View style={styles.eligibilityItem}>
              <View style={styles.checkmarkCircle}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.eligibilityText}>Have valid government identification</Text>
            </View>
            <View style={styles.eligibilityItem}>
              <View style={styles.checkmarkCircle}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.eligibilityText}>Register to vote with Elections Canada</Text>
            </View>
          </View>
        </View>

        {/* Toggle Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "identification" && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab("identification")}
          >
            <Text style={[
              styles.tabButtonText,
              selectedTab === "identification" && styles.activeTabButtonText,
            ]}>
              Identification
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "register" && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab("register")}
          >
            <Text style={[
              styles.tabButtonText,
              selectedTab === "register" && styles.activeTabButtonText,
            ]}>
              Register to Vote
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Section with better spacing */}
        <View style={styles.contentWrapper}>
          {/* Identification Section */}
          {selectedTab === "identification" && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Get Government ID</Text>
              <Text style={styles.sectionDescription}>
                To vote in a federal election, you'll need valid government-issued
                identification. Choose your province to find out how to get ID.
              </Text>

              {Platform.OS === "ios" ? (
                <TouchableOpacity
                  style={styles.provinceSelector}
                  onPress={showActionSheet}
                >
                  <Text style={styles.provinceSelectorText}>{selectedProvince}</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedProvince}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedProvince(itemValue)}
                    dropdownIconColor={COLORS.primary}
                  >
                    <Picker.Item label="Select Province" value="Select Province" />
                    {provinces.map((province, index) => (
                      <Picker.Item key={index} label={province} value={province} />
                    ))}
                  </Picker>
                </View>
              )}

              <TouchableOpacity
                style={getButtonStyle(idApplied, idClickedThisSession, styles.actionButton)}
                onPress={handleApplyForID}
              >
                <Text style={styles.actionButtonText}>
                  {getButtonText(idApplied, idClickedThisSession, "Apply for ID")}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Register to Vote Section */}
          {selectedTab === "register" && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Register with Elections Canada</Text>