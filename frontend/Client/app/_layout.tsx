import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
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
    <GluestackUIProvider mode="light">
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
