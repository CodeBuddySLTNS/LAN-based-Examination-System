import { RowDataPacket, QueryResult } from "mysql2";
import { pool } from "../database/sqlConnection";
import { CustomError } from "../utils/customError";
import { BAD_REQUEST, CONFLICT } from "../constants/statusCodes";
import { User } from "../types/objects.types";


export const sqlQuery = async (query: string, params?: string[]) => {
  let dbconn;
  let error;
  try {
    dbconn = await pool.getConnection();
    const [rows] = await dbconn.query<RowDataPacket[]>(query, params ? params : []);
    return rows;
  } catch (err: any) {
    error = err;
  } finally {
    if (dbconn) dbconn.release();
    if (error) {
      console.log(error.code);
      switch (error.code) {
        case "ER_TABLE_EXISTS_ERROR":
          throw new CustomError(error.message, BAD_REQUEST);
          break;

        case "ER_DUP_ENTRY":
          throw new CustomError(error.message, CONFLICT);
          break;

        case "ECONNREFUSED":
          throw new Error("Database connection error.");
          break;

        default:
          throw new Error(error);
      }
    }
  }
};

export const checkUser = async (username: string): Promise<boolean> => {
  const query = `SELECT * FROM users WHERE username = ? LIMIT 1`;
  const result = await sqlQuery(query, [username]);
  if (result) {
    if (result.length > 0) {
      return true;
    }
    return false;
  }
  return false;
}

export const createUser = async (payload: User) => {
  const query = `INSERT INTO users (
    name,
    username,
    password
  ) VALUES ( ?, ?, ?);`;
  const result = await sqlQuery(query, [payload.name, payload.username, payload.password]);
  return result;
}

// table query info => just ignore
const usersTableQuery = `CREATE TABLE users (
  id int primary key auto_increment,
  name varchar(255) not null,
  username varchar(255) not null unique,
  password varchar(255) not null
)`;
