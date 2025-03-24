import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";
import { light } from "@/constants/themes";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: light.bg,
          },
          drawerContentStyle: { backgroundColor: "cyans" },
          drawerItemStyle: {
            marginTop: 12,
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="home"
          options={{ drawerLabel: "Home", title: "Home" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
