import { light } from "@/constants/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  welcomeContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: light.white,
    shadowColor: light.black,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.1,
    elevation: 10,
    gap: 3,
  },
  welcomeQuote: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: light.darkWhite,
    shadowColor: light.black,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  quoteText: {
    fontFamily: "Nunito-Regular",
  },
  text: {
    fontSize: 20,
    fontFamily: "Nunito-Regular",
  },
});
