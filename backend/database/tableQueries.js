module.exports.usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    role VARCHAR(15) NOT NULL DEFAULT 'student',
    isVerified BOOL DEFAULT false
);`;

module.exports.examsTableQuery = `CREATE TABLE IF NOT EXISTS exams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    duration_hours INT NOT NULL,
    duration_minutes INT NOT NULL,
    start_time DATETIME,
    examiner_id INT NOT NULL,
    FOREIGN KEY (examiner_id) REFERENCES users(id) ON DELETE CASCADE
);`;

module.exports.questionBankTableQuery = `CREATE TABLE IF NOT EXISTS question_bank (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(255) NOT NULL,
    question_text TEXT NOT NULL UNIQUE,
    question_type ENUM('multiple_choice', 'identification', 'enumeration') NOT NULL,
    choices JSON NULL,
    correct_answer JSON,
    created_by INT NOT NULL,
    FOREIGN KEY (subject) REFERENCES subjects(course_code) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);`;

module.exports.examQuestionsTableQuery = `CREATE TABLE IF NOT EXISTS exam_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id INT NOT NULL,
    question_data JSON NOT NULL, -- Stores selected questions and exam-specific settings
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);`;

module.exports.subjectsTableQuery = `CREATE TABLE IF NOT EXISTS subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(15) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_by INT NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);`;

module.exports.responsesTableQuery = `CREATE TABLE IF NOT EXISTS responses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    exam_id INT NOT NULL,
    question_id INT NOT NULL,
    answer TEXT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES question_bank(id) ON DELETE CASCADE
);`;
