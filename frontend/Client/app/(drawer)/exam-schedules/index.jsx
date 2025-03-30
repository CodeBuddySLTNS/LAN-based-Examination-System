import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { ExamCard } from "@/components/exam-card";

const ExamSchedulesPage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user);

  const { data: exams } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const myexams = exams?.filter(
    (exam) => exam.year === user.year && exam.department === user.department
  );

  return (
    <View className="flex-1">
      <FlatList
        data={myexams || []}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View className="p-4">
            <View>
              <Text>Exam Schedules</Text>
            </View>
          </View>
        }
        ListFooterComponent={<View className="h-4" />}
        ItemSeparatorComponent={<View className="h-2" />}
        renderItem={({ item }) => <ExamCard item={item} />}
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
