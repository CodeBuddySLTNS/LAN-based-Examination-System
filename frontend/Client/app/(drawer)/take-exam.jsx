import { View, Text, FlatList } from "react-native";
import React from "react";
import { QueryProvider } from "@/providers/query-provider";
import { useLocalSearchParams } from "expo-router";

const TakeExamPage = () => {
  const params = useLocalSearchParams();
  const exam = params.exam ? JSON.parse(params.exam) : {};
  const questions = exam.questions ? JSON.parse(exam.questions) : [];
  console.log(questions);

  return (
    <View>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.question_text}</Text>}
      />
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
