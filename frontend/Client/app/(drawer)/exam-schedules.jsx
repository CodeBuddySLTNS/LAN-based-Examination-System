import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { styles } from "@/styles/exam-schedules.styles";

const dummydata = [
  {
    id: 1,
    subject: "VAL101",
    title: "midterm",
    description: "xwq",
    duration: "02 : 00",
    start_time: "2025-03-17T12:38:00.000Z",
    examiner_id: 3,
    exam_question_id: 1,
    questions:
      '[{"id":2,"subject":"CSS101","question_text":"Where does the data process?","question_type":"multiple_choice","choices":"[\\"Processor\\",\\"Software\\",\\"Hardware\\",\\"ROM\\"]","correct_answer":"[\\"Processor\\"]","created_by":"Lansano, Leo P."}]',
  },
  {
    id: 2,
    subject: "GMW",
    title: "Prelim BSIT-1",
    description: "",
    duration: "03 : 00",
    start_time: "2025-03-28T00:45:00.000Z",
    examiner_id: 4,
    exam_question_id: 2,
    questions:
      '[{"id":3,"subject":"CSS101","question_text":"These are the internal components of computer except one;","question_type":"multiple_choice","choices":"[\\"CPU\\",\\"Motherboard\\",\\"Keyboard\\",\\"Heat Sink\\"]","correct_answer":"[\\"Keyboard\\"]","created_by":"Lansano, Leo P."}]',
  },
  {
    id: 3,
    subject: "GUS",
    title: "Prelim BSIT-2",
    description: "",
    duration: "02 : 00",
    start_time: "2025-03-19T12:48:00.000Z",
    examiner_id: 4,
    exam_question_id: 3,
    questions:
      '[{"id":3,"subject":"CSS101","question_text":"These are the internal components of computer except one;","question_type":"multiple_choice","choices":"[\\"CPU\\",\\"Motherboard\\",\\"Keyboard\\",\\"Heat Sink\\"]","correct_answer":"[\\"Keyboard\\"]","created_by":"Lansano, Leo P."},{"id":2,"subject":"CSS101","question_text":"Where does the data process?","question_type":"multiple_choice","choices":"[\\"Processor\\",\\"Software\\",\\"Hardware\\",\\"ROM\\"]","correct_answer":"[\\"Processor\\"]","created_by":"Lansano, Leo P."}]',
  },
  {
    id: 4,
    subject: "CC101",
    title: "Semi-Final",
    description: "",
    duration: "04 : 00",
    start_time: "2025-02-26T12:49:00.000Z",
    examiner_id: 4,
    exam_question_id: 4,
    questions:
      '[{"id":1,"subject":"CSS101","question_text":"The main brain of the computer.","question_type":"multiple_choice","choices":"[\\"CPU\\",\\"motherboard\\",\\"RAM\\",\\"ROM\\"]","correct_answer":"[\\"CPU\\"]","created_by":"Lansano, Leo P."}]',
  },
  {
    id: 6,
    subject: "GMW",
    title: "Midterm BSCS-1",
    description:
      "the red brown fox jumps into the mama mo blue hahahahahahh  bka ako na ang para sayo\n\n\n\nc\nfdfdc",
    duration: "05 : 00",
    start_time: "2025-03-19T12:53:00.000Z",
    examiner_id: 4,
    exam_question_id: 5,
    questions: "[]",
  },
  {
    id: 7,
    subject: "CSS101",
    title: "Final BSIT-3",
    description: "",
    duration: "01 : 00",
    start_time: "2025-02-26T13:14:00.000Z",
    examiner_id: 4,
    exam_question_id: 6,
    questions:
      '[{"id":10,"subject":"CSS101","question_text":"It represents the physical and tangible components of a computer.","question_type":"multiple_choice","choices":"[\\"Hardware\\",\\"Software\\",\\"Middleware\\",\\"Malware\\"]","correct_answer":"[\\"Hardware\\"]","created_by":"Lansano, Leo P."}]',
  },
  {
    id: 8,
    subject: "GUS",
    title: "Prelim",
    description: "para sa mga wla kasabot sa ilang kaugalingon",
    duration: "03 : 00",
    start_time: "2025-03-20T01:07:00.000Z",
    examiner_id: 4,
    exam_question_id: 7,
    questions:
      '[{"id":1,"subject":"CSS101","question_text":"The main brain of the computer.","question_type":"multiple_choice","choices":"[\\"CPU\\",\\"motherboard\\",\\"RAM\\",\\"ROM\\"]","correct_answer":"[\\"CPU\\"]","created_by":"Lansano, Leo P."},{"id":2,"subject":"CSS101","question_text":"Where does the data process?","question_type":"multiple_choice","choices":"[\\"Processor\\",\\"Software\\",\\"Hardware\\",\\"ROM\\"]","correct_answer":"[\\"Processor\\"]","created_by":"Lansano, Leo P."},{"id":3,"subject":"CSS101","question_text":"These are the internal components of computer except one;","question_type":"multiple_choice","choices":"[\\"CPU\\",\\"Motherboard\\",\\"Keyboard\\",\\"Heat Sink\\"]","correct_answer":"[\\"Keyboard\\"]","created_by":"Lansano, Leo P."},{"id":10,"subject":"CSS101","question_text":"It represents the physical and tangible components of a computer.","question_type":"multiple_choice","choices":"[\\"Hardware\\",\\"Software\\",\\"Middleware\\",\\"Malware\\"]","correct_answer":"[\\"Hardware\\"]","created_by":"Lansano, Leo P."}]',
  },
  {
    id: 9,
    subject: "GMW",
    title: "zqw",
    description: "aqaqzq",
    duration: "02 : 00",
    start_time: "2025-03-20T01:35:00.000Z",
    examiner_id: 4,
    exam_question_id: 8,
    questions: "[]",
  },
];

const ExamSchedulesPage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user);

  const { data: exams, error } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={exams || dummydata}
          style={styles.examsList}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={[styles.headerText, styles.headerTitle]}>Title</Text>
              <Text style={[styles.headerText, styles.headerSubject]}>
                Subject
              </Text>
              <Text style={[styles.headerText, styles.headerTime]}>Time</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.rows}>
              <Text style={[styles.rowTitle, styles.rowText]}>
                {item.title}
              </Text>
              <Text style={[styles.rowSubject, styles.rowText]}>
                {item.title}
              </Text>
              <Text style={[styles.rowTime, styles.rowText]}>{item.title}</Text>
            </View>
          )}
        />
      </View>
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
