import { RefreshControl, ScrollView, Text, View } from "react-native";
import { Badge, BadgeText } from "./ui/badge";
import { Button, ButtonText } from "./ui/button";
import { useMainStore, useSocketStore, useTakeExamStore } from "@/states/store";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import ShowAlert from "./show-alert";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { response } from "@/db/schema";
import { useQueryClient } from "@tanstack/react-query";

export const ExamCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const user = useMainStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);
  const setStatus = useTakeExamStore((state) => state.setStatus);
  const queryClient = useQueryClient();
  const takingExam = JSON.parse(SecureStore.getItem("takingExam") || "{}");
  const handleRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries(["exam"]);
    setRefreshing(false);
    SecureStore.deleteItemAsync("takingExam");
  };

  const checkIfCompleted = () => {
    let isCompleted = false;
    console.log(user?.completed_exams);
    if (user?.completed_exams) {
      user.completed_exams.forEach((ce) => {
        console.log(ce.exam_id === item.id);
        if (ce.exam_id === item.id) return (isCompleted = true);
      });
    }
    return isCompleted;
  };

  const checkIfTakingThisExam = () => {
    return item.id === takingExam.examId && takingExam.status;
  };

  const checkIfTakingOtherExam = () =>
    takingExam.status && takingExam.examId !== item.id;

  const takeExam = async () => {
    const takingExamSync = JSON.parse(
      SecureStore.getItem("takingExam") || "{}"
    );
    if (!takingExamSync.status) {
      await SecureStore.setItemAsync(
        "takingExam",
        JSON.stringify({
          examId: item.id,
          subject: item.subject,
          status: true,
          completed: false,
          progress: 0,
        })
      );
    }

    setStatus({ takingExam: true });
    socket.emit("takeExam", item.id);
  };

  const handleStartExam = () => {
    if (checkIfTakingOtherExam()) {
      setOpen(true);
      return;
    }
    takeExam();
  };

  const proceedStartExam = async () => {
    await SecureStore.deleteItemAsync("takingExam");
    await drizzleDb.delete(response).execute();
    takeExam();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="w-[90%] mx-4  p-4 pt-3 rounded-md bg-white elevation-md">
        <ShowAlert
          open={open}
          closeFn={() => setOpen(false)}
          title="Are you sure you want to start this exam?"
          description={`You are currently taking another exam. Starting this exam will result in losing your progress on the "${takingExam.subject}" exam. Please confirm if you want to continue.`}
          okayFn={proceedStartExam}
        />

        <View className="flex-row justify-between items-center">
          <Text className="font-Nunito-Bold text-[1.35rem]">
            {item.label} (
            <Text className="font-Nunito-Regular">{`${item.course_code}`}</Text>
            )
          </Text>
          <Text className="font-Nunito-Bold">
            <Badge
              size="lg"
              action={
                checkIfCompleted()
                  ? "success"
                  : checkIfTakingThisExam()
                  ? "success"
                  : "error"
              }
              className="gap-1"
            >
              <BadgeText>
                {checkIfTakingThisExam()
                  ? "Ongoing"
                  : checkIfCompleted()
                  ? "Completed"
                  : "Not Yet Taken"}
              </BadgeText>
            </Badge>
          </Text>
        </View>

        <View className="p-2 rounded bg-gray-100 mt-2">
          <Text className="font-Nunito-Regular text-gray-700">
            {item.description ? item.description : "No Description."}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1 items-center">
          <Text className="font-Nunito-Bold text-gray-800 text-07">
            Subject:
          </Text>
          <Text className="flex-1 font-Nunito-Regular text-lg">
            {item.subject}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1">
          <Text className="font-Nunito-Bold text-gray-800 text-07">Date:</Text>
          <Text className="flex-1 font-Nunito-Regular text-07">
            {new Date(item.start_time).toLocaleString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1">
          <Text className="font-Nunito-Bold text-gray-800 text-07">
            Duration:
          </Text>
          <Text className="flex-1 font-Nunito-Regular text-07">
            {item.duration_hours === 1
              ? `${item.duration_hours} hour `
              : `${item.duration_hours} hours `}
            {item.duration_minutes
              ? `and ${item.duration_minutes} minutes`
              : ""}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1">
          <Text className="font-Nunito-Bold text-gray-800 text-07">
            Examineer:
          </Text>
          <Text className="flex-1 font-Nunito-Regular text-07">
            {item.examineer}
          </Text>
        </View>

        <View className="flex-row gap-2 pt-1">
          <Text className="font-Nunito-Bold text-gray-800 text-07">
            Status:
          </Text>
          <Text className="flex-1 font-Nunito-Regular text-07">
            <Text
              className={`font-Nunito-Regular ${
                item.is_expired
                  ? "text-red-500"
                  : item.is_started
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {item.is_expired
                ? "Expired"
                : item.is_started
                ? "Started"
                : "Not Started"}
            </Text>
          </Text>
        </View>

        <Button
          disabled={item.is_expired || !item.is_started || checkIfCompleted()}
          size="sm"
          className={`mt-3 ${
            item.is_expired || !item.is_started || checkIfCompleted()
              ? "bg-gray-100"
              : "bg-primary"
          }`}
          onPress={handleStartExam}
        >
          <ButtonText
            className={`font-Nunito-Bold text-[1.05rem] ${
              item.is_expired || !item.is_started || checkIfCompleted()
                ? "text-gray-300"
                : "text-white"
            }`}
          >
            {item.is_expired
              ? "Unavailable"
              : checkIfTakingThisExam()
              ? "Continue"
              : "START"}
          </ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
};
