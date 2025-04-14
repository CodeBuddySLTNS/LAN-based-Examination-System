import { View, Text, FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { ExamCard } from "@/components/exam-card";

const ExamSchedulesPage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const { data: exams, isFetching } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2(
      `/exams?department=${user.department}&year=${user.year}`,
      "GET"
    ),
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries(["exams"]);
    setRefreshing(false);
  };

  useEffect(() => {
    if (!isFetching) setRefreshing(false);
  }, [isFetching]);

  return (
    <View className="flex-1">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        data={exams || []}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View className="p-4">
            <View>
              <Text>Exam History</Text>
            </View>
          </View>
        }
        ListFooterComponent={<View className="h-4" />}
        ItemSeparatorComponent={<View className="h-2" />}
        renderItem={({ item }) => (
          <ExamCard
            item={item}
            btnText="Take Exam"
            btnFn={() => router.push(`/(drawer)/take-exam/${item.id}`)}
          />
        )}
      />
    </View>
  );
};

export default ExamSchedulesPage;
