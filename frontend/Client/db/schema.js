import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const response = sqliteTable("responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  student_id: integer("student_id").notNull(),
  exam_id: integer("exam_id").notNull(),
  question_id: integer("question_id").notNull(),
  answer: text("answer", { mode: "json" }).notNull(),
});
