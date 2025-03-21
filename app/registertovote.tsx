import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  ActionSheetIOS,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router"; // Import Expo Router for navigation

// Colors from our updated theme
const COLORS = {
  primary: '#52b9a9',   // Teal
  secondary: '#ff9248', // Orange
  tertiary: '#87CEEB',  // Sky Blue
  background: '#f5f7fa', // Light background
  white: '#ffffff',
  dark: '#333333',
  lightGray: '#e2e8f0',
};

export default function RegisterToVoteScreen() {
  const [selectedTab, setSelectedTab] = useState("identification");
  const [selectedProvince, setSelectedProvince] = useState("Select Province");

  //set to true for development, to bypass requirement of following linkds
  const [idApplied, setIdApplied] = useState(true); // Track ID button click
  const [voterRegistered, setVoterRegistered] = useState(true); // Track Voter Reg button click
  const router = useRouter(); // Router for navigation

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
              style={styles.actionButton}
              onPress={() => {
                Linking.openURL(
                  "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/your-card/get-a-card"
                );
                setIdApplied(true);
              }}
            >
              <Text style={styles.actionButtonText}>Apply for ID</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Register to Vote Section */}
        {selectedTab === "register" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Register with Elections Canada</Text>
            <Text style={styles.sectionDescription}>
              Even if you have ID, you need to be registered on the voters list.
              You can register online, by mail, or in person on election day.
            </Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                Linking.openURL("https://ereg.elections.ca/CWelcome.aspx?lang=e");
                setVoterRegistered(true);
              }}
            >
              <Text style={styles.actionButtonText}>Go to Voter Registration</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !idApplied || !voterRegistered ? styles.disabledButton : null,
          ]}
          disabled={!idApplied || !voterRegistered}
          onPress={() => router.push("/crossroads")}
        >
          <Text style={styles.continueButtonText}>
            Continue to Game
          </Text>
        </TouchableOpacity>
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
    padding: 20,
    alignItems: 'center',
  },
  headerSection: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.dark + 'CC',
    textAlign: 'center',
    marginBottom: 20,
  },
  eligibilityList: {
    width: '100%',
    marginTop: 15,
  },
  eligibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  eligibilityText: {
    fontSize: 16,
    color: COLORS.dark,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButtonText: {
    color: COLORS.dark + 'AA',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  tabContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.dark + 'CC',
    marginBottom: 20,
    lineHeight: 20,
  },
  provinceSelector: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  provinceSelectorText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.7,
  },
});