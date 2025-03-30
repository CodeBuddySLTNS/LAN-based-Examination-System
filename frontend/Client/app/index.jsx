import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { useRootNavigationState, useRouter } from "expo-router";
import { useMainStore, useSocketStore } from "@/states/store";
import { useToast } from "@/components/ui/toast";

const IndexPage = () => {
  const router = useRouter();
  const navState = useRootNavigationState();
  const toast = useToast();

  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: Axios2("/users/user/me"),
  });

  useEffect(() => {
    if (user) {
      useMainStore.getState().setUser(user.user);
      if (!navState?.key) return;
      useSocketStore.getState().initializeSocket(user.user, toast);
      router.replace("/home");
    }

    if (error) {
      if (!navState?.key) return;
      router.replace("/login");
    }
  }, [user, error, navState?.key]);

  return (
    <View className="flex-1 justify-center items-center">
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
