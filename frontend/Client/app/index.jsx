import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Box from "./components/Box";

const index = () => {
  return (
    <View style={styles.container}>
      <Box style={{ backgroundColor: "red" }}>Box 1</Box>
      <Box style={{ backgroundColor: "blue" }}>Box 2</Box>
      <Box style={{ backgroundColor: "green" }}>Box 3</Box>
      <Box style={{ backgroundColor: "yellow" }}>Box 4</Box>
      <Box style={{ backgroundColor: "brown" }}>Box 5</Box>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "plum",
  },
  box: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
  box1: {
    backgroundColor: "dodgerblue",
    boxShadow: "0 0 1px 2px red",
  },
  box2: {
    backgroundColor: "lightgreen",
  },
});
