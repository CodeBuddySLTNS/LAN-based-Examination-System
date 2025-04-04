import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const response = sqliteTable("responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  studentId: integer("student_id").notNull(),
  examId: integer("exam_id").notNull(),
  questionId: integer("question_id").notNull(),
  answer: text("answer", { mode: "json" }).notNull(),
});
