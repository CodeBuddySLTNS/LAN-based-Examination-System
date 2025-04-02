import { View, Text, FlatList } from "react-native";
import { QueryProvider } from "@/providers/query-provider";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ExamCard } from "@/components/exam-card";
import StartExam from "@/components/start-exam";
import { useSocketStore } from "@/states/store";

const TakeExamPage = () => {
  const params = useLocalSearchParams();
  const exam = params.exam ? JSON.parse(params.exam) : {};
  const questions = exam.questions ? JSON.parse(exam.questions) : [];
  const socket = useSocketStore((state) => state.socket);
  const [isTakingExam, setIsTakingExam] = useState(false);

  const handleTakeExam = async () => {
    await socket.emit("takeExam", exam.id);
    setIsTakingExam(true);
  };

  return (
    <View className={`flex-1 ${!isTakingExam && "justify-center"}`}>
      {isTakingExam ? (
        <StartExam examId={exam.id} questions={questions} />
      ) : (
        <ExamCard item={exam} btnText="START" btnFn={handleTakeExam} />
      )}
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
