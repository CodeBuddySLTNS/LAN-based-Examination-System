import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loadedFonts] = useFonts({
    "Nunito-Regular": require("@/assets/fonts/NunitoRegular.ttf"),
    "Nunito-Bold": require("@/assets/fonts/NunitoBold.ttf"),
    "Nunito-SemiBold": require("@/assets/fonts/NunitoSemiBold.ttf"),
    "Nunito-Medium": require("@/assets/fonts/NunitoMedium.ttf"),
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ animation: "slide_from_bottom" }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="(drawer)"
            options={{ animation: "slide_from_bottom", headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
