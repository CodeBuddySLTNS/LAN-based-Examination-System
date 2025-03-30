import { View, Text, FlatList } from "react-native";
import { QueryProvider } from "@/providers/query-provider";
import { useLocalSearchParams } from "expo-router";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";

const TakeExamPage = () => {
  const params = useLocalSearchParams();
  const exam = params.exam ? JSON.parse(params.exam) : {};
  const questions = exam.questions ? JSON.parse(exam.questions) : [];

  return (
    <View className="flex-1 justify-center">
      {/* <FlatList
        data={questions}
        keyExtractor={(exam) => exam.id.toString()}
        renderexam={({ exam }) => <Text>{exam.question_text}</Text>}
      /> */}

      <View className="mx-4  p-4 pt-3 rounded-md bg-white elevation-md">
        <View className="flex-row justify-between exams-center">
          <Text className="font-Nunito-Bold text-[1.35rem]">
            {exam.label} (
            <Text className="font-Nunito-Regular">{`${exam.course_code}`}</Text>
            )
          </Text>
          <Text className="font-Nunito-Bold">
            <Badge size="lg" action="error" className="gap-1">
              <BadgeText>Not Yet Taken</BadgeText>
            </Badge>
          </Text>
        </View>

        <View className="p-2 rounded bg-gray-100 mt-2">
          <Text className="font-Nunito-Regular text-gray-700">
            {exam.description ? exam.description : "No Description."}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1">
          <Text className="font-Nunito-Bold text-gray-800 text-07">
            Subject:
          </Text>
          <Text className="flex-1 font-Nunito-Regular text-07">
            {exam.subject}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1">
          <Text className="font-Nunito-Bold text-gray-800 text-07">Date:</Text>
          <Text className="flex-1 font-Nunito-Regular text-07">
            {new Date(exam.start_time).toLocaleString("en-US", {
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
            {exam.duration_hours === 1
              ? `${exam.duration_hours} hour `
              : `${exam.duration_hours} hours `}
            {exam.duration_minutes
              ? `and ${exam.duration_minutes} minutes`
              : ""}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1">
          <Text className="font-Nunito-Bold text-gray-800 text-07">
            Examineer:
          </Text>
          <Text className="flex-1 font-Nunito-Regular text-07">
            {exam.examineer}
          </Text>
        </View>

        <Button
          size="sm"
          className="mt-3 bg-primary"
          onPress={() => alert("coming soon...")}
        >
          <ButtonText className="font-Nunito-Bold text-[1.05rem]">
            START
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

const TakeExam = () => {
  return (
    <QueryProvider>
      <TakeExamPage />
    </QueryProvider>
  );
};

export default TakeExam;
