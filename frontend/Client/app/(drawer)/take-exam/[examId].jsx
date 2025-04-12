import { View, Text, BackHandler } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ExamCard } from "@/components/exam-card";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import StartExam from "@/components/start-exam";

const TakeExamPage = () => {
  const { examId } = useLocalSearchParams();
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
          subject={data[0]?.subject}
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
        <ExamCard item={data[0]} status={status} setStatus={setStatus} />
      )}
    </View>
  );
};

export default TakeExamPage;
