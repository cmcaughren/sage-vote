import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PlayButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Play</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
  },
});
