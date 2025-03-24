import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { QueryProvider } from "@/wrapper/query-provider";
import Homepage from "./(drawer)/home";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { useRootNavigationState, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";

const IndexPage = () => {
  const router = useRouter();
  const navState = useRootNavigationState();
  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: Axios2("/users/user/me"),
  });

  useEffect(() => {
    if (user) {
      useMainStore.getState().setUser(user.user);
      if (!navState?.key) return;
      router.replace("/home");
    }
    if (error) {
      if (!navState?.key) return;
      router.replace("/login");
    }
  }, [user, error, navState?.key]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Loading...</Text>
    </View>
  );
};

const index = () => {
  return (
    <QueryProvider>
      <View style={{ flex: 1 }}>
        <IndexPage />
      </View>
    </QueryProvider>
  );
};

export default index;
