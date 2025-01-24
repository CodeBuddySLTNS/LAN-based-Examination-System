const CustomError = require("../utils/customError");
const { pool } = require("../database/sqlConnection");
const { BAD_REQUEST, CONFLICT } = require("../constants/statusCodes");

// reusable function to query database
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
      console.log(error.code);
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

// check if a user exists in users table
const checkUser = async username => {
  const query = `SELECT * FROM users WHERE username = ? LIMIT 1`;
  const result = await sqlQuery(query, [username]);
  if (result) {
    if (result.length > 0) {
      return result[0];
    }
    return false;
  }
  return false;
};

// insert data to users table
const createUser = async payload => {
  const query = `INSERT INTO users (
    name,
    username,
    password
  ) VALUES ( ?, ?, ?);`;
  const result = await sqlQuery(query, [
    payload.name,
    payload.username,
    payload.password
  ]);
  return result;
};

// table query info => just ignore
const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id int primary key auto_increment,
  name varchar(255) not null,
  username varchar(255) not null unique,
  password varchar(255) not null
)`;

module.exports = {
  sqlQuery,
  checkUser,
  createUser,
  usersTableQuery
};
