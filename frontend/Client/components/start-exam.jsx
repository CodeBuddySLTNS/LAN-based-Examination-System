import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { useMainStore, useSocketStore } from "@/states/store";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { response } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useMutation } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { Icon } from "./ui/icon";
import { ChartNoAxesColumn, House } from "lucide-react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Countdown, { zeroPad } from "react-countdown";
import ShowResults from "./show-results";

const StartExam = ({
  examId,
  subject,
  duration,
  questions,
  status,
  setStatus,
}) => {
  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const countdownRef = useRef(null);
  const user = useMainStore((state) => state.user);
  const addCompletedExam = useMainStore((state) => state.addCompletedExam);
  const [endTime, setEndTime] = useState(Date.now() + duration);
  const [answer, setAnswer] = useState({ status: false, data: null });
  const socket = useSocketStore((state) => state.socket);
  const [results, setResults] = useState({
    status: false,
    loading: true,
    data: null,
  });

  const { mutateAsync: submit } = useMutation({
    mutationFn: Axios2("/exams/submit", "POST"),
    onError: (e) => {
      console.log(e.message);
      setResults((prev) => ({ ...prev, loading: false }));
    },
    onSuccess: (data) => {
      drizzleDb.delete(response).execute();
      SecureStore.deleteItemAsync("takingExam");
      addCompletedExam({ exam_id: examId });
      setStatus((prev) => ({ ...prev, submitted: true }));
      setResults((prev) => ({ ...prev, loading: false, data, data }));
    },
  });

  const handleAnswer = async (answer) => {
    try {
      await SecureStore.setItemAsync(
        "takingExam",
        JSON.stringify({
          status: true,
          examId,
          subject,
          progress: status.count + 1,
        })
      );

      await drizzleDb.insert(response).values({
        examId: examId,
        studentId: user.id,
        questionId: questions[status.count].id,
        answer: JSON.stringify([answer]),
      });
    } catch (error) {
      console.log(error);
    }
    setAnswer({ status: true, data: answer });
  };

  const handleNext = async () => {
    if (status.count + 1 === questions.length) {
      if (status.completed && status.submitted) {
        setResults((prev) => ({ ...prev, status: true }));
        return;
      }

      countdownRef.current?.pause();
      await SecureStore.setItemAsync(
        "takingExam",
        JSON.stringify({ status: true, examId })
      );
      setStatus((prev) => ({ ...prev, completed: true }));
      setResults((prev) => ({ ...prev, status: true }));
      submitExam();
      return;
    }

    socket.emit("examProgress", { examId, progress: status.count + 2 });

    setAnswer({ status: false, data: null });
    setStatus((prev) => ({ ...prev, count: prev.count + 1 }));
  };

  async function submitExam() {
    try {
      await submit({
        examId,
        responses: await drizzleDb
          .select()
          .from(response)
          .where(eq(response.examId, examId)),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const returnHome = () => {
    setStatus({
      takingExam: false,
      count: 0,
      completed: false,
      submitted: false,
    });
    router.replace("/(drawer)/home");
  };

  const renderChoices = (array) => {
    const choices = array || [];
    return (
      <VStack className="gap-3">
        {choices.map((choice, id) => (
          <Pressable
            key={id}
            onPress={() => handleAnswer(choice)}
            disabled={answer.status}
          >
            <Text
              className={`p-4 text-center rounded elevation ${
                answer.data === choice ? "bg-secondary" : "bg-gray-200"
              }`}
            >
              {choice}
            </Text>
          </Pressable>
        ))}
      </VStack>
    );
  };

  useEffect(() => {
    const savedProgress = SecureStore.getItem("takingExam");
    if (savedProgress) {
      const takingExam = JSON.parse(savedProgress);
      setStatus((prev) => ({
        ...prev,
        count: takingExam.progress || prev.count,
      }));
    }
  }, []);

  const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <View className="items-center p-4 rounded-md bg-gray-50 elevation">
        <Text className="font-Nunito-SemiBold text-07 mb-1">Time Left:</Text>
        <HStack className="gap-2">
          <View className="items-center">
            <Text className="font-Nunito-Bold text-3xl">
              {zeroPad(hours, 2)}
            </Text>
            <Text className="font-Nunito-Bold text-sm">HH</Text>
          </View>
          <Text className="font-Nunito-Bold text-2xl">:</Text>
          <View className="items-center">
            <Text className="font-Nunito-Bold text-3xl">
              {zeroPad(minutes, 2)}
            </Text>
            <Text className="font-Nunito-Bold text-sm">MM</Text>
          </View>
          <Text className="font-Nunito-Bold text-2xl">:</Text>
          <View className="items-center">
            <Text className="font-Nunito-Bold text-3xl">
              {zeroPad(seconds, 2)}
            </Text>
            <Text className="font-Nunito-Bold text-sm">SS</Text>
          </View>
        </HStack>
      </View>
    );
  };

  return (
    <VStack className="flex-1 p-4 gap-4">
      <ShowResults
        result={results}
        setResults={setResults}
        setStatus={setStatus}
      />

      <Countdown
        ref={countdownRef}
        date={endTime}
        renderer={countdownRenderer}
        zeroPadTime={2}
      />

      <View className="flex-1">
        <View className="flex-1">
          <View className="p-4">
            {questions.length === 0 ? (
              <Text className="font-Nunito-Regular text-lg text-center mb-2">
                No Questions.
              </Text>
            ) : (
              <>
                <Text className="font-Nunito-Regular text-lg text-center mb-2">
                  Question:
                </Text>
                <Text className="pt-1 pb-3 text-xl text-center">
                  {questions[status.count].question_text}
                </Text>
              </>
            )}
          </View>
          {questions.length !== 0 && (
            <VStack className="flex-1">
              {questions[status.count].question_type === "multiple_choice"
                ? renderChoices(questions[status.count].choices)
                : ""}
            </VStack>
          )}
        </View>

        <View className="flex-row gap-2">
          <Pressable
            className={`flex-1 p-3 elevation rounded-md ${
              answer.status ? "bg-primary" : "bg-gray-300"
            }`}
            onPress={handleNext}
            disabled={!answer.status}
          >
            <View className="flex-row gap-1.5 items-center justify-center">
              {status.completed && (
                <Icon color="white" as={ChartNoAxesColumn} size="lg" />
              )}
              <Text className="font-Nunito-SemiBold text-xl text-white">
                {status.completed
                  ? "Results"
                  : status.count + 1 === questions?.length
                  ? "Finish Exam"
                  : "Next"}
              </Text>
            </View>
          </Pressable>
          {status.completed && (
            <Pressable
              className="flex-1 p-3 elevation rounded-md bg-primary"
              onPress={returnHome}
            >
              <View className="flex-row gap-1.5 items-center justify-center">
                <Icon color="white" as={House} size="lg" />
                <Text className="font-Nunito-SemiBold text-xl text-white">
                  Home
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </VStack>
  );
};

export default StartExam;
