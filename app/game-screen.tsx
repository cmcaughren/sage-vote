import { View, Text, Button } from "react-native";
import PlayButton from "@/components/ui/PlayButton";
import { Link } from "expo-router";

export default function GameScreen() {
  const handlePlay = () => {
    console.log("Play button pressed!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Sage Vote!</Text>
      <PlayButton onPress={handlePlay} />
      <Link href="/test-screen" asChild>
        <Button title="Go to Test Screen" />
      </Link>
    </View>
  );
}
