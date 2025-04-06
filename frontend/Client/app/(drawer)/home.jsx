import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import Entypo from "@expo/vector-icons/Entypo";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { X } from "lucide-react-native";
import { Pre } from "@expo/html-elements";

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
  const [showQuote, setShowQuote] = useState(true);
  const user = useMainStore((state) => state.user) || dummyuser;

  const { data: exams } = useQuery({
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
      {showQuote && (
        <Card className="elevation-md relative">
          <Pressable
            onPress={() => setShowQuote(false)}
            className="p-2 absolute right-0"
          >
            <Icon as={X} size="lg" />
          </Pressable>

          <Text className="font-Nunito-Bold text-2xl">
            {greet()}, {user.username}{" "}
            <Entypo name="emoji-happy" size={24} color="black" />
          </Text>

          <View className="p-2 bg-gray-100 rounded">
            <Text className="font-Nunito-Regular text-07">
              "Believe in yourself, and all that you are. Know that there is
              something inside you that is greater than any obstacle." –
              Christian D. Larson
            </Text>
          </View>
        </Card>
      )}

      <Card className="py-9 mt-3 elevation-md">
        <Text className="font-Nunito-Bold text-4xl text-center text-green-600">
          100%
        </Text>
        <Text className="font-Nunito-Regular text-07 text-center">
          Your average Accuracy
        </Text>
      </Card>

      <View className="mt-4">
        <Text className="font-Nunito-SemiBold text-xl text-center">
          Upcoming exams
        </Text>
      </View>

      {exams &&
        exams.length > 0 &&
        exams.map((exam) => (
          <Card
            key={exam.id}
            className="flex-row items-center mt-3 gap-3 elevation-md"
          >
            <Text className="flex-1 font-Nunito-Bold text-07">
              {exam.label} ({exam.course_code})
            </Text>
            <Text className="flex-1 font-Nunito-Bold text-07 text-center">
              Jan 16
            </Text>
            <Pressable
              onPress={() => {
                router.push("/(drawer)/exam-schedules/take-exam", {
                  params: { exam: JSON.stringify(exam) },
                });
              }}
            >
              <Text className="font-Nunito-Bold text-07 rounded px-3 py-1 bg-primary text-white">
                View
              </Text>
            </Pressable>
          </Card>
        ))}
    </ScrollView>
  );
};

export default Homepage;
