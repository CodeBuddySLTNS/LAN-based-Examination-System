import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import Entypo from "@expo/vector-icons/Entypo";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { X } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";

const Homepage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [showQuote, setShowQuote] = useState(true);
  const user = useMainStore((state) => state.user);

  const { data: exams } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const { data: accuracy } = useQuery({
    queryKey: ["accuracy"],
    queryFn: Axios2("/users/user/accuracy", "GET"),
  });

  const upcomingExams =
    exams?.filter((exam) => {
      let examTaken = false;
      user?.completed_exams?.forEach((ce) => {
        if (ce.exam_id === exam.id) return (examTaken = true);
      });
      return !examTaken;
    }) || [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries(["exams", "user", "accuracy"]);
    useMainStore.getState().refreshUser();
    setRefreshing(false);
  };

  const averageColor = (average) => {
    if (average > 80) {
      return "text-green-600";
    } else if (average > 60) {
      return "text-green-500";
    } else if (average > 40) {
      return "text-yellow-500";
    } else if (average > 20) {
      return "text-orange-600";
    } else {
      return "text-red-600";
    }
  };

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
        <Text
          className={`font-Nunito-Bold text-4xl text-center ${averageColor(
            parseFloat(accuracy?.average_accuracy || "0.0")
          )}`}
        >
          {accuracy?.average_accuracy
            ? accuracy.average_accuracy + "%"
            : "0.00%"}
        </Text>
        <Text className="font-Nunito-Regular text-07 text-center">
          Your average Accuracy
        </Text>
      </Card>

      <View className="mt-4">
        <Divider />
        <Text className="font-Nunito-SemiBold mt-2 text-xl text-center">
          Upcoming exams
        </Text>
      </View>

      {upcomingExams.length > 0 ? (
        upcomingExams.map((exam) => (
          <Card
            key={exam.id}
            className="flex-row items-center mt-3 gap-3 elevation-md"
          >
            <Text className="flex-1 font-Nunito-Bold text-07">
              {exam.label} ({exam.course_code})
            </Text>
            <Text className="flex-1 font-Nunito-Bold text-07 text-center">
              {new Date(exam.start_time).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
              })}
            </Text>
            <Pressable
              onPress={() => {
                router.push(`/(drawer)/take-exam/${exam.id}`);
              }}
            >
              <Text className="font-Nunito-Bold text-07 rounded px-3 py-1 bg-primary text-white">
                View
              </Text>
            </Pressable>
          </Card>
        ))
      ) : (
        <Card className="mt-4 bg-transparent">
          <Text className="font-Nunito-Regular text-center">No exams.</Text>
        </Card>
      )}
    </ScrollView>
  );
};

export default Homepage;
