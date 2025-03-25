import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/wrapper/query-provider";

const ExamSchedulesPage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user);

  const { data: exams, error } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });
  return (
    <View>
      <Text>ExamSchedules</Text>
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const ExamSchedules = () => {
  return (
    <QueryProvider>
      <ExamSchedulesPage />
    </QueryProvider>
  );
};

export default ExamSchedules;
