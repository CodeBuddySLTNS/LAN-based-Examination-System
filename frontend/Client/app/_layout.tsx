import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { QueryProvider } from "@/providers/query-provider";

export const DATABASE_NAME = "systemdb";

export default function RootLayout() {
  const [loadedFonts] = useFonts({
    "Nunito-Regular": require("@/assets/fonts/NunitoRegular.ttf"),
    "Nunito-Bold": require("@/assets/fonts/NunitoBold.ttf"),
    "Nunito-SemiBold": require("@/assets/fonts/NunitoSemiBold.ttf"),
    "Nunito-Medium": require("@/assets/fonts/NunitoMedium.ttf"),
  });

  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (
    <QueryProvider>
      <GluestackUIProvider mode="light">
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <SQLiteProvider
            databaseName={DATABASE_NAME}
            options={{ enableChangeListener: true }}
            useSuspense
          >
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="(drawer)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </SafeAreaView>
            </SafeAreaProvider>
          </SQLiteProvider>
        </Suspense>
      </GluestackUIProvider>
    </QueryProvider>
  );
}
