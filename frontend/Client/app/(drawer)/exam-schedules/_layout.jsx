import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "default" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="take-exam" />
    </Stack>
  );
};

export default _layout;
