import { View, Text, FlatList } from "react-native";
import { QueryProvider } from "@/providers/query-provider";
import { useLocalSearchParams } from "expo-router";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { ExamCard } from "@/components/exam-card";
import StartExam from "@/components/start-exam";

const TakeExamPage = () => {
  const params = useLocalSearchParams();
  const exam = params.exam ? JSON.parse(params.exam) : {};
  const questions = exam.questions ? JSON.parse(exam.questions) : [];
  const [isTakingExam, setIsTakingExam] = useState(false);

  return (
    <View className="flex-1 justify-center">
      {isTakingExam ? <StartExam /> : <ExamCard item={exam} />}
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
