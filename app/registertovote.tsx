import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  Platform,
  ActionSheetIOS,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router"; // Import Expo Router for navigation

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
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      {/* Title Section */}
      <View
        style={{
          maxWidth: 700,
          width: "100%",
          marginTop: 40,
          marginBottom: 20,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          You are inspired to participate in the success of the upcoming Canadian federal election!
        </Text>
        <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
          To be eligible to vote, you must:
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 5 }}>
          1. Obtain valid government identification.
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 5 }}>
          2. Register to vote.
        </Text>
      </View>

      {/* Toggle Buttons */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            padding: 12,
            backgroundColor: selectedTab === "identification" ? "#007bff" : "#ccc",
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => setSelectedTab("identification")}
        >
          <Text style={{ color: selectedTab === "identification" ? "#fff" : "#666" }}>
            Identification
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 12,
            backgroundColor: selectedTab === "register" ? "#007bff" : "#ccc",
            borderRadius: 5,
          }}
          onPress={() => setSelectedTab("register")}
        >
          <Text style={{ color: selectedTab === "register" ? "#fff" : "#666" }}>
            Register to Vote
          </Text>
        </TouchableOpacity>
      </View>

      {/* Identification Section */}
      {selectedTab === "identification" && (
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Select your Province or Territory:</Text>

          {Platform.OS === "ios" ? (
            <TouchableOpacity
              style={{
                padding: 12,
                borderWidth: 1,
                borderColor: "#007bff",
                borderRadius: 5,
                width: 250,
                alignItems: "center",
                marginBottom: 20,
              }}
              onPress={showActionSheet}
            >
              <Text style={{ fontSize: 16, color: "#007bff" }}>{selectedProvince}</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#007bff",
                borderRadius: 5,
                width: 250,
                marginBottom: 20,
                backgroundColor: "#fff",
              }}
            >
              <Picker
                selectedValue={selectedProvince}
                style={{ height: 50, width: "100%" }}
                onValueChange={(itemValue) => setSelectedProvince(itemValue)}
              >
                <Picker.Item label="Select Province" value="Select Province" />
                {provinces.map((province, index) => (
                  <Picker.Item key={index} label={province} value={province} />
                ))}
              </Picker>
            </View>
          )}

          <Button
            title="Apply for ID ➜"
            onPress={() => {
              Linking.openURL(
                "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/your-card/get-a-card"
              );
              setIdApplied(true);
            }}
          />
        </View>
      )}

      {/* Register to Vote Section */}
      {selectedTab === "register" && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Visit Elections Canada to register to vote.
          </Text>

          <Button
            title="Voter Registration ➜"
            onPress={() => {
              Linking.openURL("https://ereg.elections.ca/CWelcome.aspx?lang=e");
              setVoterRegistered(true);
            }}
          />
        </View>
      )}

      {/* Continue Button (Only enabled when both actions are completed) */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: idApplied && voterRegistered ? "#007bff" : "#ccc",
          borderRadius: 5,
          marginTop: 30,
          width: 200,
          alignItems: "center",
          opacity: idApplied && voterRegistered ? 1 : 0.5,
        }}
        disabled={!idApplied || !voterRegistered}
        onPress={() => router.push("/crossroads")}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
