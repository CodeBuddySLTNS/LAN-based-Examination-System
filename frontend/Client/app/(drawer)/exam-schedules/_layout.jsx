import { QueryProvider } from "@/providers/query-provider";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="take-exam/[examId]" />
    </Stack>
  );
};

export default _layout;
