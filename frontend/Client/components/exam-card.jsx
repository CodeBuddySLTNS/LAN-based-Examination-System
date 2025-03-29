import { Pressable, Text, View } from "react-native";
import { Badge, BadgeText } from "./ui/badge";
import { Button, ButtonText } from "./ui/button";
import { useRouter } from "expo-router";

export const ExamCard = ({ item }) => {
  const router = useRouter();
  return (
    <View className="mx-4  p-4 pt-3 rounded-md bg-white elevation-md">
      <View className="flex-row justify-between items-center">
        <Text className="font-Nunito-Bold text-[1.35rem]">
          {item.label} (
          <Text className="font-Nunito-Regular">{`${item.course_code}`}</Text>)
        </Text>
        <Text className="font-Nunito-Bold">
          <Badge size="lg" action="error" className="gap-1">
            <BadgeText>Not Yet Taken</BadgeText>
          </Badge>
        </Text>
      </View>

      <View className="p-2 rounded bg-gray-100 mt-2">
        <Text className="font-Nunito-Regular text-gray-700">
          {item.description ? item.description : "No Description."}
        </Text>
      </View>

      <View className="flex-row gap-2 pt-1">
        <Text className="font-Nunito-Bold text-gray-800 text-07">Subject:</Text>
        <Text className="flex-1 font-Nunito-Regular text-07">
          {item.subject}
        </Text>
      </View>

      <View className="flex-row gap-2 pt-1">
        <Text className="font-Nunito-Bold text-gray-800 text-07">Date:</Text>
        <Text className="flex-1 font-Nunito-Regular text-07">
          {new Date(item.start_time).toLocaleString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      <View className="flex-row gap-2 pt-1">
        <Text className="font-Nunito-Bold text-gray-800 text-07">
          Duration:
        </Text>
        <Text className="flex-1 font-Nunito-Regular text-07">
          {item.duration_hours === 1
            ? `${item.duration_hours} hour `
            : `${item.duration_hours} hours `}
          {item.duration_minutes ? `and ${item.duration_minutes} minutes` : ""}
        </Text>
      </View>

      <View className="flex-row gap-2 pt-1">
        <Text className="font-Nunito-Bold text-gray-800 text-07">
          Examineer:
        </Text>
        <Text className="flex-1 font-Nunito-Regular text-07">
          {item.examineer}
        </Text>
      </View>

      <Button
        size="sm"
        className="mt-3 bg-primary"
        onPress={() =>
          router.push({
            pathname: "/(drawer)/take-exam",
            params: { exam: JSON.stringify(item) },
          })
        }
      >
        <ButtonText className="font-Nunito-Bold text-[1.05rem]">
          Take Exam
        </ButtonText>
      </Button>
    </View>
  );
};
