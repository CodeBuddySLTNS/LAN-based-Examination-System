import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import { styles } from "@/styles/drawer.styles";
import { useMainStore } from "@/states/store";

export default function CustomDrawer(props) {
  const user = useMainStore((state) => state.user);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={require("@/assets/images/pikachu.png")}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.department}>
            {user.department} {user.year} | @{user.username}
          </Text>
          <View style={styles.buttons}>
            {/* <Text style={[styles.badge, styles.edit]}>Edit</Text> */}
            <Text style={[styles.badge, styles.logout]}>Logout</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
