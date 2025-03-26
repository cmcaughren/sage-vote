// app/registertovote.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  ActionSheetIOS,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { styles } from "../styles/screens/RegisterToVote.styles";
import { COLORS } from "../styles/theme/colors";

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