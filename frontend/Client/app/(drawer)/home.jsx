import { FlatList, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { Badge, BadgeText } from "@/components/ui/badge";
import Entypo from "@expo/vector-icons/Entypo";
import { Card } from "@/components/ui/card";

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
  const user = useMainStore((state) => state.user) || dummyuser;

  const { data: exams, error } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  return (
    <View className="p-3">
      <Card className="elevation-md">
        <Text className="font-Nunito-Bold text-2xl">
          Magandang umaga, {user.username}{" "}
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
    </View>
  );
};

const Home = () => {
  return (
    <QueryProvider>
      <Homepage />
    </QueryProvider>
  );
};

export default Home;
