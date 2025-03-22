import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "@/styles/home.styles";
import { Link, Redirect } from "expo-router";
import { useMainStore } from "@/states/store";

const index = () => {
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);

  if (!isLoggedIn) return <Redirect href="/login" />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Home Bebeluvs.</Text>
      <Link href="/login">Login</Link>
    </View>
  );
};

export default index;
