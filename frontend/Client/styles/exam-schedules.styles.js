import { light } from "@/constants/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  examsList: {
    height: "auto",
    padding: 10,
    borderRadius: 10,
    backgroundColor: light.white,
    shadowColor: light.black,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowOpacity: 0.1,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    gap: 8,
  },
  headerText: {
    fontSize: 17,
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: light.darkWhite,
  },
  headerTitle: {
    flexGrow: 10,
    textAlign: "left",
  },
  headerSubject: {
    flexGrow: 2,
  },
  headerTime: {
    flexGrow: 1,
  },
  rows: {
    flexDirection: "row",
    gap: 8,
  },
  rowText: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    textAlign: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "red",
  },
  rowTitle: {
    flexGrow: 10,
    textAlign: "left",
  },
  rowSubject: {
    flexGrow: 2,
  },
  rowTime: {
    flexShrink: 1,
  },
});
