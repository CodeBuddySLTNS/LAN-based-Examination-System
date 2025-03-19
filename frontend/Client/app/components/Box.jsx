import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Box = ({ children, style }) => {
  return (
    <View style={[style]}>
      <Text>{children}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({});
