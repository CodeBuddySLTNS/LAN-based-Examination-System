import { StyleSheet } from "react-native";
import { light } from "@/constants/themes";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: light.bgVariant,
  },
  profileContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: light.primary,
    backgroundColor: light.primary,
  },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    paddingTop: 5,
    color: light.text,
  },
  department: {
    color: light.text,
    paddingBottom: 5,
  },
  buttons: {
    flexDirection: "row",
    gap: 5,
  },
  badge: {
    color: light.text,
    borderWidth: 1.3,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  edit: {
    backgroundColor: light.primary,
  },
  logout: {
    backgroundColor: "red",
  },
});
