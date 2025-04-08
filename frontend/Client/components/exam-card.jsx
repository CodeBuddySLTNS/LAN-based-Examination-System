import { Pressable, Text, View } from "react-native";
import { Badge, BadgeText } from "./ui/badge";
import { Button, ButtonText } from "./ui/button";
import { useMainStore } from "@/states/store";

export const ExamCard = ({ item, btnText, btnFn }) => {
  const user = useMainStore((state) => state.user);

  const checkIfCompleted = (examId) => {
    let isCompleted = false;
    if (user?.completed_exams) {
      user.completed_exams.forEach((ce) => {
        if (ce.exam_id === examId) return (isCompleted = true);
      });
    }
    return isCompleted;
  };

  return (
    <View className="mx-4  p-4 pt-3 rounded-md bg-white elevation-md">
      <View className="flex-row justify-between items-center">
        <Text className="font-Nunito-Bold text-[1.35rem]">
          {item.label} (
          <Text className="font-Nunito-Regular">{`${item.course_code}`}</Text>)
        </Text>
        <Text className="font-Nunito-Bold">
          <Badge
            size="lg"
            action={checkIfCompleted(item.id) ? "success" : "error"}
            className="gap-1"
          >
            <BadgeText>
              {checkIfCompleted(item.id) ? "Completed" : "Not Yet Taken"}
            </BadgeText>
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

      <View className="flex-row gap-2 pt-1">
        <Text className="font-Nunito-Bold text-gray-800 text-07">Status:</Text>
        <Text className="flex-1 font-Nunito-Regular text-07">
          <Text
            className={`font-Nunito-Regular ${
              item.is_started ? "text-green-500" : "text-red-500"
            }`}
          >
            {item.is_started ? "Ongoing" : "Not Started"}
          </Text>
        </Text>
      </View>

      <Button
        disabled={checkIfCompleted(item.id)}
        size="sm"
        className={`mt-3 ${
          checkIfCompleted(item.id) ? "bg-gray-100" : "bg-primary"
        }`}
        onPress={btnFn}
      >
        <ButtonText
          className={`font-Nunito-Bold text-[1.05rem] ${
            checkIfCompleted(item.id) ? "text-gray-300" : "text-white"
          }`}
        >
          {btnText || "Action"}
        </ButtonText>
      </Button>
    </View>
  );
};
