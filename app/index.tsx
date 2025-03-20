import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>Sage Vote</Text>

      {/* Button to navigate to ID and Register screen */}
      <Link href="/registertovote" asChild>
        <Button title="Play" />
      </Link>

      <Link href="/create-card" asChild>
        <Button title="Create Cards" />
      </Link>

    </View>
  );
}
