CREATE TABLE `responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_id` integer NOT NULL,
	`exam_id` integer NOT NULL,
	`question_id` integer NOT NULL
);
