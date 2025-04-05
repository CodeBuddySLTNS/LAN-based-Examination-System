import { View, Text, FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { ExamCard } from "@/components/exam-card";

const ExamSchedulesPage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const { data: exams, isFetching } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries(["exams"]);
  };

  const myexams = exams?.filter(
    (exam) => exam?.year === user?.year && exam?.department === user?.department
  );

  useEffect(() => {
    if (!isFetching) setRefreshing(false);
  }, [isFetching]);

  return (
    <View className="flex-1">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
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
        renderItem={({ item }) => (
          <ExamCard
            item={item}
            btnText="Take Exam"
            btnFn={() =>
              router.push({
                pathname: "/(drawer)/exam-schedules/take-exam",
                params: { exam: JSON.stringify(item) },
              })
            }
          />
        )}
      />
    </View>
  );
};

export default ExamSchedulesPage;
