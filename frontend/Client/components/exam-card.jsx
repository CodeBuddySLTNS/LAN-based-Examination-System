import { Text, View } from "react-native";
import { Badge, BadgeText } from "./ui/badge";

export const ExamCard = ({ item }) => {
  return (
    <View className="mx-4  p-4 pt-3 rounded-md bg-white elevation-md">
      <View className="flex-row justify-between items-center">
        <Text className="font-Nunito-Bold text-[1.15rem]">
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
        <Text className="font-Nunito-Bold text-gray-800">Subject:</Text>
        <Text className="flex-1 font-Nunito-Regular text-ellipsis overflow-hidden">
          {item.subject}
        </Text>
      </View>

      <View className="flex-row gap-2 pt-1">
        <Text className="font-Nunito-Bold text-gray-800">Duration:</Text>
        <Text className="flex-1 font-Nunito-Regular text-ellipsis overflow-hidden">
          {item.duration_hours === 1
            ? `${item.duration_hours} hour `
            : `${item.duration_hours} hours `}
          {item.duration_minutes ? `and ${item.duration_minutes} minutes` : ""}
        </Text>
      </View>

      <View className="flex-row gap-2 pt-1">
        <Text className="font-Nunito-Bold text-gray-800">Duration:</Text>
        <Text className="flex-1 font-Nunito-Regular text-ellipsis overflow-hidden">
          {item.duration_hours} hours{" "}
          {item.duration_minutes ? `${item.duration_minutes} minutes` : ""}
        </Text>
      </View>
    </View>
  );
};
