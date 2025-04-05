import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import Entypo from "@expo/vector-icons/Entypo";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const dummyuser = {
  id: 1,
  name: "Lansano, Leo P.",
  username: "leo",
  department: "BSIT",
  year: 3,
  role: "user",
};

const Homepage = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const user = useMainStore((state) => state.user) || dummyuser;

  const { data: exams, error } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const handleRefresh = async () => {};

  const greet = () => {
    const date = new Date();
    let message;
    if (date.getHours() === 12) {
      message = "Magandang tanghali";
    } else if (date.getHours() >= 13 && date.getHours() < 18) {
      message = "Magandang hapon";
    } else if (date.getHours() >= 18) {
      message = "Magandang gabi";
    } else {
      message = "Magandang umaga";
    }
    return message;
  };

  return (
    <ScrollView
      className="p-3"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Card className="elevation-md">
        <Text className="font-Nunito-Bold text-2xl">
          {greet()}, {user.username}{" "}
          <Entypo name="emoji-happy" size={24} color="black" />
        </Text>

        <View className="p-2 bg-gray-100 rounded">
          <Text className="font-Nunito-Regular text-07">
            "Believe in yourself, and all that you are. Know that there is
            something inside you that is greater than any obstacle." – Christian
            D. Larson
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default Homepage;
