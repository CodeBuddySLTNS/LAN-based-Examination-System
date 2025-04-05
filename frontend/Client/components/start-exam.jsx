import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { useMainStore, useSocketStore } from "@/states/store";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { response } from "@/db/schema";
import { eq } from "drizzle-orm";
import ShowResults from "./show-results";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";

const StartExam = ({ examId, questions }) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const user = useMainStore((state) => state.user);
  const [count, setCount] = useState(0);
  const [results, setResults] = useState({ status: false, loading: true });
  const [answer, setAnswer] = useState({ status: false, data: null });
  const socket = useSocketStore((state) => state.socket);

  const { mutateAsync: submit } = useMutation({
    mutationFn: Axios2("/exams/submit", "POST"),
    onError: (e) => {
      console.log(e.message);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleAnswer = async (answer) => {
    try {
      await SecureStore.setItemAsync(
        "takingExam",
        JSON.stringify({ status: true, examId, progress: count + 1 })
      );

      await drizzleDb.insert(response).values({
        examId: examId,
        studentId: user.id,
        questionId: questions[count].id,
        answer: answer,
      });
    } catch (error) {
      console.log(error);
    }
    setAnswer({ status: true, data: answer });
  };

  const handleNext = async () => {
    if (count + 1 === questions.length) {
      setResults((prev) => ({ ...prev, status: true }));
      return;
    }

    socket.emit("examProgress", { examId, progress: count + 2 });

    setAnswer({ status: false, data: null });
    setCount((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      console.log("submitting...");
      await submit({
        examId,
        responses: await drizzleDb
          .select()
          .from(response)
          .where(eq(response.examId, examId)),
      });

      console.log("submitted.");

      // await drizzleDb.delete(response).where(eq(response.examId, examId));
      // await SecureStore.deleteItemAsync("takingExam");
    } catch (error) {
      console.log(error);
    }
  };

  const renderChoices = (array) => {
    const choices = JSON.parse(array) || [];

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

  return (
    <VStack className="flex-1 p-4 gap-4">
      <ShowResults
        result={results}
        setResults={setResults}
        submitFn={handleSubmit}
      />
      <View className="items-center p-4 rounded-md bg-gray-50 elevation">
        <Text className="font-Nunito-SemiBold text-07 mb-1">Time Left:</Text>
        <HStack className="gap-2">
          <View className="items-center">
            <Text className="font-Nunito-Bold text-3xl">00</Text>
            <Text className="font-Nunito-Bold text-sm">HH</Text>
          </View>
          <Text className="font-Nunito-Bold text-2xl">:</Text>
          <View className="items-center">
            <Text className="font-Nunito-Bold text-3xl">26</Text>
            <Text className="font-Nunito-Bold text-sm">MM</Text>
          </View>
          <Text className="font-Nunito-Bold text-2xl">:</Text>
          <View className="items-center">
            <Text className="font-Nunito-Bold text-3xl">46</Text>
            <Text className="font-Nunito-Bold text-sm">SS</Text>
          </View>
        </HStack>
      </View>
      <View className="flex-1">
        <View className="flex-1">
          <View className="p-4">
            <Text className="font-Nunito-Regular text-lg text-center mb-2">
              Question:
            </Text>
            <Text className="pt-1 pb-3 text-xl text-center">
              {questions[count].question_text}
            </Text>
          </View>
          <VStack className="flex-1">
            {questions[count].question_type === "multiple_choice"
              ? renderChoices(questions[count].choices)
              : ""}
          </VStack>
        </View>
        <Pressable
          className={`p-3 elevation rounded-md ${
            answer.status ? "bg-primary" : "bg-gray-300"
          }`}
          onPress={handleNext}
          disabled={!answer.status}
        >
          <Text className="font-Nunito-Bold text-xl text-white text-center">
            {count + 1 === questions?.length ? "Finish Exam" : "Next"}
          </Text>
        </Pressable>
      </View>
    </VStack>
  );
};

export default StartExam;
