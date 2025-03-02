const CustomError = require("../utils/customError");
const { pool } = require("../database/sqlConnection");
const { BAD_REQUEST, CONFLICT } = require("../constants/statusCodes");

// function to query database
const sqlQuery = async (query, params) => {
  let dbconn;
  let error;
  try {
    dbconn = await pool.getConnection();
    const [rows] = await dbconn.query(query, params || []);
    return rows;
  } catch (err) {
    error = err;
  } finally {
    if (dbconn) dbconn.release();
    if (error) {
      console.log("dbError:", error);
      switch (error.code) {
        case "ER_TABLE_EXISTS_ERROR":
          throw new CustomError(error.message, BAD_REQUEST);

        case "ER_DUP_ENTRY":
          throw new CustomError(error.message, CONFLICT);

        case "ECONNREFUSED":
          throw new Error("Database connection error.");

        default:
          throw new Error(error);
      }
    }
  }
};

const questionsTableQuery = `CREATE TABLE IF NOT EXISTS questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  question VARCHAR(255) NOT NULL,
  correct_answer JSON NOT NULL,
  incorrect_answer JSON NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)`;

module.exports = sqlQuery;
