import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require("../assets/fonts/Outfit-Regular.ttf"),
    'outfit-medium': require("../assets/fonts/Outfit-Medium.ttf"),
    'outfit-bold': require("../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="item/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="checkout/address" options={{ headerShown: false }} />
        </Stack>
      </CartProvider>
    </SafeAreaProvider>
  );
}
