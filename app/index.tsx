import Entry from "@/components/Entry.jsx";
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Index() {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        outfit: require("../assets/fonts/Outfit-Regular.ttf"),
        "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
        "outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);
  if (!fontLoaded) return null;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Entry />
    </View>
  );
}
