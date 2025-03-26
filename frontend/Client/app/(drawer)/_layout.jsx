import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/custom-drawer";
import { light } from "@/constants/themes";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: light.bg,
          },
          drawerInactiveTintColor: light.white,
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
          }}
        />
        <Drawer.Screen
          name="exam-schedules"
          options={{ drawerLabel: "Exam Schedules", title: "Exam Schedules" }}
        />
        <Drawer.Screen
          name="[id]"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
