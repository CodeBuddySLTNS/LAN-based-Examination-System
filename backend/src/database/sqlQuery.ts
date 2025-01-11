import { pool } from "../database/sqlConnection";
import { CustomError } from "../utils/customError";
import { BAD_REQUEST, CONFLICT } from "../constants/statusCodes";

export const sqlQuery = async (query: string) => {
  let dbconn;
  let error;
  try {
    dbconn = await pool.getConnection();
    const [result] = await dbconn.query(query);
    return result;
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

const usersTableQuery = `CREATE TABLE users ( 
  id int primary key auto_increment,
  name varchar(255) not null,
  username varchar(255) not null unique,
  password varchar(255) not null
)`;