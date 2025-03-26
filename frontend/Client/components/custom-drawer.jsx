import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import { styles } from "@/styles/drawer.styles";
import { useMainStore } from "@/states/store";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const dummyuser = {
  id: 1,
  name: "Lansano, Leo P.",
  username: "leo",
  department: "BSIT",
  year: 3,
  role: "user",
};

export default function CustomDrawer(props) {
  const user = useMainStore((state) => state.user) || dummyuser;
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    useMainStore.getState().setUser(null);
    router.replace("/login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={require("@/assets/images/pikachu.png")}
          />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.department}>
            {user?.department} {user?.year} | offline
          </Text>
          <View style={styles.buttons}>
            {/* <Text style={[styles.badge, styles.edit]}>Edit</Text> */}
            <Text style={[styles.badge, styles.logout]} onPress={handleLogout}>
              Logout
            </Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
