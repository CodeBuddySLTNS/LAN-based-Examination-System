import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Box = ({ children, style }) => {
  return (
    <View style={[styles.box, style]}>
      <Text>{children}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
});
