import { pool } from "../database/sqlConnection";
import { CustomError } from "../utils/customError";
import { BAD_REQUEST } from "../constants/statusCodes";

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
      if (error.code === "ER_TABLE_EXISTS_ERROR") {
        throw new CustomError(error.message, BAD_REQUEST);
      } else if (error.code === "ECONNREFUSED") {
        throw new Error("Database connection error.");
      }
      throw new Error(error);
    }
  }
};
