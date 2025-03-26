import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginForm: {
    width: "85%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },
  formTitle: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "Nunito",
  },
  input: {
    width: "100%",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputLabel: {
    paddingVertical: 1.5,
  },
  errorText: {
    color: "red",
  },
});
