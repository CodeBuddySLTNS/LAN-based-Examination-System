import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ExamCard } from "@/components/exam-card";
import StartExam from "@/components/start-exam";
import { useSocketStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";

const TakeExamPage = () => {
  const { examId } = useLocalSearchParams();
  const socket = useSocketStore((state) => state.socket);
  const [exam, setExam] = useState({});
  const [isTakingExam, setIsTakingExam] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["exam", exam?.id],
    queryFn: Axios2("/exams/?examId=" + examId),
  });

  const handleTakeExam = async () => {
    await socket.emit("takeExam", exam?.id);
    setIsTakingExam(true);
  };

  useEffect(() => {
    if (data) {
      setExam(data[0]);
    }
  }, [data]);

  if (isLoading || isFetching) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${!isTakingExam && "justify-center"}`}>
      {isTakingExam ? (
        <StartExam examId={exam?.id} questions={exam.questions} />
      ) : (
        <ExamCard item={exam} btnText="START" btnFn={handleTakeExam} />
      )}
    </View>
  );
};

export default TakeExamPage;
