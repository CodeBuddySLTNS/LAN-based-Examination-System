import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect } from "react";
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

  const initializeUser = async (user) => {
    await useMainStore.getState().setUser(user.user);
    await useSocketStore.getState().initializeSocket(user.user, toast);
    if (!navState?.key) return;
    router.replace("/home");
  };

  useEffect(() => {
    if (user) initializeUser(user);

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

export default IndexPage;
