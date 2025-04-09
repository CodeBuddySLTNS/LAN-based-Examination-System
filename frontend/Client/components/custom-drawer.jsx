import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";
import { useMainStore } from "@/states/store";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "./ui/avatar";

export default function CustomDrawer(props) {
  const user = useMainStore((state) => state.user);
  const isOnline = useMainStore((state) => state.isOnline);
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    useMainStore.getState().setUser(null);
    console.log(await SecureStore.getItemAsync("token"));
    router.replace("/login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View className="bg-primary p-6 pb-5 rounded-lg">
        <View className="items-center">
          <Avatar size="xl" className="border-secondary border-2 bg-secondary">
            <AvatarFallbackText>You</AvatarFallbackText>
            {isOnline && <AvatarBadge />}
            <AvatarImage source={require("@/assets/images/pikachu.png")} />
          </Avatar>
          <Text className="font-Nunito-Bold text-color text-xl">
            {user?.name}
          </Text>
          <Text className="font-Nunito-Regular text-color text-sm">
            {user?.department} {user?.year} | {isOnline ? "online" : "offline"}
          </Text>
          <View className="">
            <Text
              className="border mt-2 px-4 pt-0.5 pb-1 rounded-md bg-red-700 font-Nunito-Regular text-white"
              onPress={handleLogout}
            >
              Logout
            </Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
