import { Text, View } from "react-native";
import React from "react";
import { styles } from "@/styles/home.styles";
import { Link } from "expo-router";
import { QueryProvider } from "@/wrapper/query-provider";

const IndexPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Home Bebeluvs.</Text>
      <Link href="/login">Login</Link>
    </View>
  );
};

const index = () => {
  return (
    <QueryProvider>
      <IndexPage />
    </QueryProvider>
  );
};

export default index;
