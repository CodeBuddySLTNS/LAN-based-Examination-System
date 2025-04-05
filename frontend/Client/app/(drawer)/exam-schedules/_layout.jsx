import { QueryProvider } from "@/providers/query-provider";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="take-exam" />
      </Stack>
    </QueryProvider>
  );
};

export default _layout;
