import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { useRootNavigationState, useRouter } from "expo-router";
import { useMainStore, useSocketStore } from "@/states/store";

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
      useSocketStore.getState().initializeSocket();
      router.replace("/home");
    }

    if (error) {
      if (!navState?.key) return;
      router.replace("/login");
    }
  }, [user, error, navState?.key]);

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" />
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
