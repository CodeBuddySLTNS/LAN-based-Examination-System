import { useMainStore } from "@/states/store";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);
  const isLoading = useMainStore((state) => state.isLoading);

  useEffect(() => {
    useMainStore.getState().setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!isLoggedIn) return <Redirect href="/login" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ animation: "slide_from_bottom" }}>
          <Stack.Screen
            name="index"
            options={{ title: "Home", animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="login"
            options={{ animation: "slide_from_bottom", headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
