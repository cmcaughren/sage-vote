import { View, Text, ActivityIndicator } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
