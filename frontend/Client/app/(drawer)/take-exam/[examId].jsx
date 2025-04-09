import { View, Text, BackHandler } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ExamCard } from "@/components/exam-card";
import { useSocketStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import * as SecureStore from "expo-secure-store";
import StartExam from "@/components/start-exam";

const TakeExamPage = () => {
  const { examId } = useLocalSearchParams();
  const socket = useSocketStore((state) => state.socket);
  const takingExam = JSON.parse(SecureStore.getItem("takingExam") || "{}");
  const [status, setStatus] = useState({
    takingExam: false,
    count: 0,
    completed: false,
    submitted: false,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["exam", examId],
    queryFn: Axios2("/exams/?id=" + examId),
  });

  const handleTakeExam = async () => {
    console.log(data[0]?.id);
    if (!takingExam.status) {
      console.log(takingExam);
      await SecureStore.setItemAsync(
        "takingExam",
        JSON.stringify({
          status: true,
          examId: data[0]?.id,
          progress: 0,
        })
      );
    }
    await socket.emit("takeExam", data[0]?.id);
    setStatus((prev) => ({ ...prev, takingExam: true }));
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setStatus({
          takingExam: false,
          count: 0,
          completed: false,
          submitted: false,
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
          examId={data[0]?.id}
          duration={
            (data[0]?.duration_hours * 60 + data[0]?.duration_minutes) *
            60 *
            1000
          }
          questions={data[0]?.questions}
          status={status}
          setStatus={setStatus}
        />
      ) : (
        <ExamCard item={data[0]} btnText="START" btnFn={handleTakeExam} />
      )}
    </View>
  );
};

export default TakeExamPage;
