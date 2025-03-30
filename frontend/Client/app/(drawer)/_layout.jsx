import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/custom-drawer";
import { light } from "@/constants/themes";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter, useSegments } from "expo-router";

export default function DrawerLayout() {
  const router = useRouter();
  const segments = useSegments();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: light.bg,
          },
          drawerInactiveTintColor: light.color,
          drawerInactiveBackgroundColor: light.bgVariant,
          drawerItemStyle: {
            marginTop: 12,
          },
          drawerLabelStyle: {
            fontFamily: "Nunito-Bold",
          },
          headerTitleStyle: {
            fontFamily: "Nunito-Bold",
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ size, color }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="exam-schedules"
          options={{
            drawerLabel: "Exam Schedules",
            title: segments?.join("/").includes("take-exam")
              ? "Good Luck, You got this! 🍀"
              : "Exam Schedules",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="schedule" size={size} color={color} />
            ),
          }}
          listeners={{
            focus: () => router.replace("/(drawer)/exam-schedules"),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
