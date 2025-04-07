import { View, Text, BackHandler } from "react-native";
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
  const [status, setStatus] = useState({
    takingExam: false,
    count: 0,
    completed: false,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["exam", examId],
    queryFn: Axios2("/exams/?id=" + examId),
  });

  const handleTakeExam = async () => {
    await socket.emit("takeExam", exam?.id);
    setStatus((prev) => ({ ...prev, takingExam: true }));
  };

  useEffect(() => {
    if (data) setExam(data[0]);
  }, [data]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setStatus({
          takingExam: false,
          count: 0,
          completed: false,
        });
      }
    );

    return () => backHandler.remove();
  }, []);

  if (isLoading || isFetching) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${!status.takingExam && "justify-center"}`}>
      {status.takingExam ? (
        <StartExam
          examId={exam?.id}
          questions={JSON.parse(exam?.questions || "[]")}
          status={status}
          setStatus={setStatus}
        />
      ) : (
        <ExamCard item={exam} btnText="START" btnFn={handleTakeExam} />
      )}
    </View>
  );
};

export default TakeExamPage;
