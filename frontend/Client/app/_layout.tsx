import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ animation: "slide_from_bottom" }}>
          <Stack.Screen
            name="index"
            options={{ title: "Home", animation: "fade_from_bottom" }}
          />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
